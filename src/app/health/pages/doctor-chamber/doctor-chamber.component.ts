import { Component } from '@angular/core';
import { DoctorChambersClientService } from '../../services/doctor-chambers-client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable, map, filter, switchMap } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { HealthOptionsService } from '../../services/health-options.service';
import { DoctorsChambersCreateRequestModel, DoctorsChambersResponseModel, DoctorsChambersUpdateRequestModel } from '../../types/doctors-chambers.types';
import { HealthRoutePath } from '../../constant/health-route-path';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';
@Component({
  selector: 'app-doctor-chamber',
  standalone: false,
  templateUrl: './doctor-chamber.component.html',
  styleUrl: './doctor-chamber.component.scss',
})
export class DoctorChamberComponent {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  hospitals$: Observable<OptionsModel[]> = this.optionService.getHospitalOptions();
  doctors$: Observable<OptionsModel[]> = this.optionService.getDoctorOptions();
  listRouteUrl = `health/${HealthRoutePath.DoctorChambers}`;
  constructor(
    private formBuilder: FormBuilder,
    private doctorChamberService: DoctorChambersClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private optionService: HealthOptionsService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }

  onSave() {
    const requestModel: DoctorsChambersCreateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.doctorChamberService.save(requestModel).subscribe({
        next: () => {
          this.notificationService.success(NotificationMessage.SavedSuccessfully);
          this.router.navigate([this.listRouteUrl]);
        },
        error: () => {
          this.notificationService.error(NotificationMessage.AlreadyExist);
        },
      })
    );
  }

  onUpdate() {
    const requestModel: DoctorsChambersUpdateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.doctorChamberService.update(requestModel).subscribe({
        next: () => {
          this.notificationService.success(NotificationMessage.UpdatedSuccessfully);
          this.router.navigate([this.listRouteUrl]);
        },
        error: () => {
          this.notificationService.error(NotificationMessage.AlreadyExist);
        },
      })
    );
  }

  onVillageChange(villageId: string) {
    this.formGroup.patchValue({ villageId });
  }

  resetForm() {
    if (this.isEditMode) {
      this.router.navigate([this.listRouteUrl]);
    } else {
      this.formGroup.reset({ doctorsType: 1 });
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadData() {
    this.subscription.add(this.activatedRoute.params.pipe(map((params: Params) => params['id']), 
    filter(data => Boolean(data)),
    switchMap((id: string) => this.doctorChamberService.getById<DoctorsChambersResponseModel>(id))
    ).subscribe({
      next: (response: DoctorsChambersResponseModel) => {
        const { ...restValue } = response;
              this.formGroup.setValue({
                ...restValue,
              });
              this.isEditMode= true;
      },
      error:()=> this.notificationService.error(NotificationMessage.ServerError),
    }));




    // this.activatedRoute.params.subscribe((params: Params) => {
    //   const id: string = params['id'];
    //   if (id) {
    //     this.subscription.add(
    //       this.doctorChamberService.getById<DoctorsChambersResponseModel>(id).subscribe((data: DoctorsChambersResponseModel) => {
    //         const { ...restValue } = data;
    //         this.formGroup.setValue({
    //           ...restValue,
    //         });
    //       })
    //     );

    //     this.isEditMode = true;
    //   }
    // });
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      doctorId: ['', [Validators.required]],
      hospitalId: [null, [Validators.required]],
      firstTimeVisitFees: [null, [Validators.required]],
      firstTimeReportFees: [0],
      secondTimeVisitFees: [null],
      secondTimeReportFees: [0],
      oldPatientDays: [0],
      phoneForSerial1: ['',[Validators.maxLength(30)]],
      phoneForSerial2: ['',[Validators.maxLength(30)]],
      visitOnline: [false],
      giveDiscount: [null],
      isAvailable: [true],
    });
  }
}
