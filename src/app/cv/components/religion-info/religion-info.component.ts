import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PreferableService } from '../../services/preferable.service';
import { PreferableCreateRequestType, PreferableReponseType } from '../../types/preferable-types';
import { CvEnumOptionsComponent } from '../matrimonial-basic/matrimonial-basic-options.component';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

@Component({
  selector: 'app-religion-info',
  templateUrl: './religion-info.component.html',
  styleUrls: ['./religion-info.component.scss']
})
export class ReligionInfoComponent extends CvEnumOptionsComponent implements OnInit, OnDestroy {
  religionFormGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private preferableService: PreferableService,
    private notificationService: NotificationService,) {
    super();
  }
  ngOnInit(): void {
    this.initializeFormGroup();

    this.activatedRoute.params.subscribe({
      next: (params:Params) => {
        const id = params['id'];
        console.log(id);
        if(id) {
          this.loadData(id);
        }
      }
    })
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const requestModel: PreferableCreateRequestType = this.religionFormGroup.value;

    requestModel.personId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.preferableService.update<PreferableCreateRequestType, unknown>(requestModel).subscribe({
      next: () => {
        this.notificationService.success(NotificationMessage.SavedSuccessfully);
      },
      error: (err) => {
        console.log('NotSaved',err);
        this.notificationService.error(NotificationMessage.SavedFailure);
      }
    });
  }

  onClear() {
    this.religionFormGroup.reset();
  }

  private loadData(personId: string) {
    this.preferableService.getById<PreferableReponseType>(personId).subscribe({
      next: (response: PreferableReponseType) => {
        if(response) {
          const { ...restValue } = response;
          this.religionFormGroup.setValue({...restValue});
        }
      }
    , error: (error) => console.log(error)
    })
  }

  private initializeFormGroup() {
    this.religionFormGroup = this.fb.group({
      personId:  [null],
      height:    [null],
      complexion:[null],
    });
  }
}
