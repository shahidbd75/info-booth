import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { PersonService } from 'src/app/personnel/services/person.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ToletService } from '../../services/tolet.service';
import { ToletOptionsService } from '../../services/tolet-options.service';
import { ToLetCreateRequestModel, ToLetUpdateRequestModel } from '../../types/tolet-request-model';
import { ToLetDetailResponseModel } from '../../types/tolet-response-model';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

@Component({
  selector: 'app-tolet',
  templateUrl: './tolet.component.html',
  styleUrls: ['./tolet.component.scss'],
})
export class ToletComponent implements OnInit, OnDestroy, AfterViewInit {
  toletForm: FormGroup;
  isEditMode = false;
  detailResponse: ToLetDetailResponseModel;
  selectedDistrictId: number;
  selectedUpazilaId: number;
  selectedVillageId: string;
  subscription: Subscription;

  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  rentTypes$: Observable<OptionsModel[]> = this.optionService.getFlatTypes();
  views$: Observable<OptionsModel[]> = this.optionService.getFlatViews();
  aminities$: Observable<OptionsModel[]> = this.optionService.getAmenities();
  landmarks$: Observable<OptionsModel[]> = this.optionService.getLandMarks();
  religions$: Observable<OptionsModel[]> = this.optionService.getReligions();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toletService: ToletService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    public optionService: ToletOptionsService
  ) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.loadTolet();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
  initializeFormGroup() {
    this.toletForm = this.fb.group({
      personId: [null, [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      rent: ['', [Validators.required, Validators.maxLength(8)]],
      isRentNegotiable: [false, [Validators.required]],
      availableFrom: [null, [Validators.required]],
      advanceMoney: [0],
      floorNumber: [0],
      totalFloor: [0],
      numberOfBed: [0],
      numberOfBath: [0],
      description: ['', [Validators.maxLength(250)]],
      areaInSqFeet: [false],
      rentTypeId: [null],
      viewId: [null],
      hasGenerator: [false],
      isBachelorAllowed: [false],
      hasParking: [false],
      careTakerName: [null],
      careTakerPhone: [null],
      landMarkIds: [null],
      amenities: [null],
      preferableReligion: [null],
      id: [null],
    });
  }

  onToletSave() {
    const requestModel: ToLetCreateRequestModel = { ...this.toletForm.value };

    this.toletService.saveToLet(requestModel).subscribe(
      {
        next: () => {
          this.notificationService.success(NotificationMessage.SavedSuccessfully)
          this.router.navigate(['tolet/to-lets']);
        },
        error: (err) => this.notificationService.error(NotificationMessage.SavedFailure)
      }
    );
  }

  onToletUpdate() {
    const requestModel: ToLetUpdateRequestModel = { ...this.toletForm.value };

    this.toletService.updateToLet(requestModel).subscribe(
      () => {
        this.router.navigate(['tolet/to-lets']);
      },
      error => console.log(error)
    );
  }

  resetForm() {
    this.router.navigate(['tolet/to-lets']);
  }

  onVillageChange(villageId: string) {
    this.toletForm.patchValue({ villageId });
  }

  ngAfterViewInit(): void {
    this.toletForm.patchValue(this.detailResponse);
  }

  private formatTime(inputTime: string): string {
    const date = new Date();
    if (inputTime) {
      date.setHours(+inputTime.split(':')[0]);
      date.setMinutes(+inputTime.split(':')[1]);
    }

    return date.toLocaleTimeString([], { timeStyle: 'short' });
  }
  private loadTolet() {
    this.subscription = this.activatedRoute.params.pipe(
      map(param => param['id']),
      filter(data => Boolean(data)),
      switchMap((id)=> this.toletService.getToLetById(id)),
    ).subscribe((tolet: ToLetDetailResponseModel) => {
      this.isEditMode = true;
      this.detailResponse = tolet;
      this.toletForm.patchValue(tolet);
    });
  }
}
