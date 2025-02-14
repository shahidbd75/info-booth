import { Component, OnDestroy, OnInit } from '@angular/core';
import { HealthAmenitiesService } from '../../services/health-amenities.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HealthAmenityCreateRequestModel, HealthAmenityUpdateRequestModel, HealthAmenityResponseModel } from '../../types/health-amenities.types';
import { HealthRoutePath } from '../../constant/health-route-path';

@Component({
    selector: 'app-amenity',
    templateUrl: './amenity.component.html',
    styleUrl: './amenity.component.scss',
    standalone: false
})
export class AmenityComponent implements OnInit, OnDestroy {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private specializationService: HealthAmenitiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      banglaName: ['', [Validators.required]],
    });

    this.loadData();
  }

  onSave() {
    const requestModel: HealthAmenityCreateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.specializationService.save(requestModel).subscribe({
          next: () => {
            this.router.navigate([`health/${HealthRoutePath.Amenities}`]);
          },
          error: () => console.log('Not saved')
        })
    );
  }

  onUpdate() {
    const requestModel: HealthAmenityUpdateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.specializationService.update(requestModel).subscribe({
        next:() => {
          this.router.navigate([`health/${HealthRoutePath.Amenities}`]);
        },
        error:() => console.log('Not updated')
      })
    );
  }

  resetForm() {
    if (this.isEditMode) {
      this.router.navigate([`health/${HealthRoutePath.Amenities}`]);
    } else {
      this.formGroup.reset();
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
          this.specializationService.getById<HealthAmenityResponseModel>(id).subscribe((data: HealthAmenityResponseModel) => {
            const { createdDate, isActive, ...restValue } = data;
            this.formGroup.setValue({
              ...restValue,
            });
          })
        );

        this.isEditMode = true;
      }
    });
  }
}