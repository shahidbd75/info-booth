import { OptionsModel } from './../../../shared/models/options-model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HealthOptionsService } from '../../services/health-options.service';
import { HospitalsClientService } from '../../services/hospitals-client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DoctorsCreateRequestModel, DoctorsUpdateRequestModel, DoctorsResponseModel } from '../../types/doctors-types';

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
  selectedDistrictId: number;
  selectedUpazilaId: number;
  selectedVillageId: string;
  healthCareTypes$: Observable<OptionsModel[]> = this.optionService.getHealthCareTypes();
  amenities$: Observable<OptionsModel[]> = this.optionService.getHealthAmenities();
  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalsClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private optionService: HealthOptionsService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }

  onSave() {
    const requestModel: DoctorsCreateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.hospitalService.save(requestModel).subscribe({
        next: () => {
          this.router.navigate(['health/doctors']);
        },
        error: () => console.log('Not saved')
       }));
  }

  onUpdate() {
    const requestModel: DoctorsUpdateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.hospitalService.update(requestModel).subscribe(
        {
          next:() => {
            this.router.navigate(['health/doctors']);
          },
          error:() => console.log('Not updated')
        }
      )
    );
  }

  onVillageChange(villageId: string) {
    this.formGroup.patchValue({ villageId });
  }

  resetForm() {
    if (this.isEditMode) {
      this.router.navigate(['health/doctors']);
    } else {
      this.formGroup.reset({doctorsType:1});
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.subscription.add(
          this.hospitalService.getById<DoctorsResponseModel>(id).subscribe((data: DoctorsResponseModel) => {
            const { createdDate, isActive,name, ...restValue } = data;
            this.formGroup.setValue({
              ...restValue,
            });
          })
        );

        this.isEditMode = true;
      }
    });
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
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
      amenities:           [null, [Validators.required]],
    });
  }
}
