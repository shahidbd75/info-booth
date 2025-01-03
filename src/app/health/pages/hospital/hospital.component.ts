import { OptionsModel } from './../../../shared/models/options-model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { HealthOptionsService } from '../../services/health-options.service';
import { HospitalsClientService } from '../../services/hospitals-client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HospitalsCreateRequestModel, HospitalsResponseModel, HospitalsUpdateRequestModel } from '../../types/hospitals-types';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

@Component({
  selector: 'app-hospital',
  standalone: false,
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.scss'
})
export class HospitalComponent {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  healthCareTypes$: Observable<OptionsModel[]> = this.optionService.getHealthCareTypes();
  amenities$: Observable<OptionsModel[]> = this.optionService.getHealthAmenities();
  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalsClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private optionService: HealthOptionsService,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }

  onSave() {
    const requestModel: HospitalsCreateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.hospitalService.save(requestModel).subscribe({
        next: () => {
          this.notification.success(NotificationMessage.SavedSuccessfully);
          this.router.navigate(['health/hospitals']);
        },
        error: () => this.notification.error(NotificationMessage.SavedFailure)
       }));
  }

  onUpdate() {
    const requestModel: HospitalsUpdateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.hospitalService.update(requestModel).subscribe(
        {
          next:() => {
            this.notification.success(NotificationMessage.UpdatedSuccessfully);
            this.router.navigate(['health/hospitals']);
          },
          error:() => this.notification.error(NotificationMessage.UpdatedFailure)
        }
      )
    );
  }

  resetForm() {
    if (this.isEditMode) {
      this.router.navigate(['health/hospitals']);
    } else {
      this.formGroup.reset({doctorsType:1});
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadData() {
    this.subscription = this.activatedRoute.params.pipe(
      map(param => param['id']),
      filter(data => Boolean(data)),
      switchMap((id)=> this.hospitalService.getById<HospitalsResponseModel>(id)),
    ).subscribe((data: HospitalsResponseModel) => {
      this.isEditMode = true;
        this.formGroup.setValue(data);
    });
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      id:                  [null],
      name:                ['', [Validators.required]],
      banglaName:          [''],
      healthCareTypeId:    [null, [Validators.required]],
      numberOfBed:         [null],
      totalDoctor:         [null],
      totalStaff:          [null],
      departments:         [''],
      phoneNumber:         [''],
      phoneNumber2:        [''],
      mobileNumber:        [''],
      mobileNumber2:       [''],
      hotlineNumber:       [''],
      contactPersonName:   [''],
      contactPersonNumber: [''],
      villageId:           [null],
      amenityIds:          [null, [Validators.required]],
    });
  }
}
