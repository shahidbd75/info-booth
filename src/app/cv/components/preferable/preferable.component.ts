import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreferableService } from '../../services/preferable.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PreferableReponseType, PreferableRequestType } from '../../types/preferable-types';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

import { CvEnumOptionsComponent } from '../matrimonial-basic/matrimonial-basic-options.component';

@Component({
  selector: 'app-preferable',
  templateUrl: './preferable.component.html',
  styleUrls: ['./preferable.component.scss'],
})
export class PreferableComponent extends CvEnumOptionsComponent implements OnInit, OnDestroy {
  preferableFormGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private preferableService: PreferableService,
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
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const requestModel: PreferableRequestType = this.preferableFormGroup.value;

    requestModel.personId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.preferableService.update<PreferableRequestType, unknown>(requestModel).subscribe({
      next: () => {
        this.notificationService.success(NotificationMessage.SavedSuccessfully);
      },
      error: () => console.log('NotSaved'),
    });
  }

  onClear() {
    this.preferableFormGroup.reset();
  }

  private loadData(personId: string) {
    this.preferableService.getById<PreferableReponseType>(personId).subscribe({
      next: (response: PreferableReponseType) => {
        if (response) {
          const { ...restValue } = response;
          this.preferableFormGroup.setValue({ ...restValue });
        }
      },
      error: error => console.log(error),
    });
  }

  private initializeFormGroup() {
    this.preferableFormGroup = this.fb.group({
      personId: [null],
      beardType: [null],
      familyType: [null],
      prayer: [null],
      smokingStatus: [null],
      hijabType: [null],
      notCompromisable: [''],
      pertiallyCompromisable: [''],
      compromisable: [''],
      occupationIds: [null],
    });
  }
}
