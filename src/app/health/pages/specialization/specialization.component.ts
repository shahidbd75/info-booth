import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpecializationClientService } from '../../services/specialization-client.service';
import { SpecializationCreateRequestModel, SpecializationResponseModel, SpecializationUpdateRequestModel } from '../../types/specialization-model';

@Component({
    selector: 'app-specialization',
    templateUrl: './specialization.component.html',
    styleUrl: './specialization.component.scss',
    standalone: false
})
export class SpecializationComponent implements OnInit, OnDestroy {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private specializationService: SpecializationClientService,
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
    const requestModel: SpecializationCreateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.specializationService.save(requestModel).subscribe(
        () => {
          this.router.navigate(['health/specializations']);
        },
        () => console.log('Not saved')
      )
    );
  }

  onUpdate() {
    const requestModel: SpecializationUpdateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.specializationService.update(requestModel).subscribe(
        () => {
          this.router.navigate(['health/specializations']);
        },
        () => console.log('Not updated')
      )
    );
  }

  resetForm() {
    if (this.isEditMode) {
      this.router.navigate(['health/specializations']);
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
          this.specializationService.getById<SpecializationResponseModel>(id).subscribe((data: SpecializationResponseModel) => {
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