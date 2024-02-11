import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatrimonialBasicCvService } from '../../services/matrimonial-basic.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CvEnumOptionsComponent } from './matrimonial-basic-options.component';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { MatrimonialReponseType, MatrimonialUpdateRequestType } from '../../types/matrimonial-basic-types';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

@Component({
  selector: 'app-matrimonial-basic',
  templateUrl: './matrimonial-basic.component.html',
  styleUrls: ['./matrimonial-basic.component.scss'],
})
export class MatrimonialBasicComponent extends CvEnumOptionsComponent implements OnInit, OnDestroy {
  matrimonialFormGroup: FormGroup;
  subscription: Subscription = new Subscription();
  numbers: OptionsModel[];
  haveChildren = false;

  constructor(
    private fb: FormBuilder,
    private matrimonialService: MatrimonialBasicCvService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroup();

    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        const id = params['id'];
        if (id) {
          this.loadData(id);
        }
      },
    });

    this.onFormValueChange();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const requestModel: MatrimonialUpdateRequestType = this.matrimonialFormGroup.value;

    requestModel.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.matrimonialService.update<MatrimonialUpdateRequestType, unknown>(requestModel).subscribe({
      next: () => {
        this.notificationService.success(NotificationMessage.SavedSuccessfully);
      },
      error: () => this.notificationService.error(NotificationMessage.SavedFailure),
    });
  }

  onClear() {
    this.matrimonialFormGroup.reset();
  }

  private loadData(personId: string) {
    this.matrimonialService.getById<MatrimonialReponseType>(personId).subscribe({
      next: (response: MatrimonialReponseType) => {
        if (response) {
          const { ...restValue } = response;
          this.matrimonialFormGroup.setValue({ ...restValue });
        }
      },
      error: () => {
        this.notificationService.error(NotificationMessage.SavedFailure);
      },
    });
  }

  private initializeFormGroup() {
    this.matrimonialFormGroup = this.fb.group({
      id: [null],
      guardianRelation: [null, [Validators.required]],
      height: [null],
      weight: [null],
      chest: [null],
      passport: [null],
      annualIncome: [null],
      familyWealthDetail: [null],
      selfWealthDetail: [null],
      shortTimeAmbition: [null],
      longTimeAmbition: [null],
      handiCrafts: [null],
      facebookProfileLink: [null],
      presentAddress: [null],
      workAddress: [null],
      expectations: [null],
      otherSkills: [null],
      skill: [null],
      dressStyle: [null],
      bodyType: [null],
      hairColor: [null],
      eyeColor: [null],
      complexion: [null],
      diet: [null],
      disability: [null],
      familyValue: [null],
      personalValue: [null],
      residencyStatus: [null],
      haveChildren: [false],
      noOfBrother: [null],
      noOfMarriedBrother: [null],
      noOfSister: [null],
      noOfMarriedSister: [null],
      maritalStatus: [null, [Validators.required]],
      noOfChildren: new FormControl({ value: null, disabled: true }, [Validators.max(10), Validators.maxLength(2)]),
      maritialDescription: ['', [Validators.maxLength(150)]],
      aboutMyself: [null],
      smokingStatusId: [null],
      drinkingStatus: [null],
      beardTypeId: [null],
      otherAddiction: [null],
      familyTypeId: [null],
      sleepingDuration: [0],
      startSleep: [null],
      aboutDrowry: [null],
      presentCountry: [null],
    });
  }

  private onFormValueChange() {
    this.matrimonialFormGroup.controls['haveChildren'].valueChanges.subscribe({
      next: val => {
        if (val) {
          this.matrimonialFormGroup.controls['noOfChildren'].enable();
        } else {
          this.matrimonialFormGroup.controls['noOfChildren'].reset();
          this.matrimonialFormGroup.controls['noOfChildren'].disable();
        }
      },
    });
  }
}
