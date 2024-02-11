import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CvEnumOptionsComponent } from '../matrimonial-basic/matrimonial-basic-options.component';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';
import { ReligionParametersType } from '../../types/religion-parameter-type';
import { ReligionInformationService } from '../../services/religion-information.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ReligionInformationRequest } from '../../types/religion-information-type';

@Component({
  selector: 'app-religion-info',
  templateUrl: './religion-info.component.html',
  styleUrls: ['./religion-info.component.scss'],
})
export class ReligionInfoComponent extends CvEnumOptionsComponent implements OnInit, OnDestroy {
  religionFormGroup: FormGroup;
  subscription: Subscription = new Subscription();
  religionParams$: Observable<ReligionParametersType[]>;
  castes$: Observable<Array<OptionsModel>>;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private religionService: ReligionInformationService,
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
          this.getParametersByPersonId(id);
          this.getCastesByPersonId(id);
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
    const requestModel: ReligionInformationRequest = this.religionFormGroup.value;

    requestModel.personId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.religionService.update<ReligionInformationRequest, unknown>(requestModel).subscribe({
      next: () => {
        this.notificationService.success(NotificationMessage.SavedSuccessfully);
      },
      error: err => {
        console.log('NotSaved', err);
        this.notificationService.error(NotificationMessage.SavedFailure);
      },
    });
  }

  onClear() {
    this.religionFormGroup.reset();
  }

  private loadData(personId: string) {
    this.religionService.getById<ReligionInformationRequest>(personId).subscribe({
      next: (response: ReligionInformationRequest) => {
        if (response) {
          const { religionParameters, ...restValue } = response;
          this.religionFormGroup.patchValue({ ...restValue });
        }
      },
      error: error => console.log(error),
    });
  }

  private initializeFormGroup() {
    this.religionFormGroup = this.fb.group({
      personId: [null],
      religiousBeliefId: [null],
      casteId: [null],
      prayerId: [null],
      prayerInMosqueId: [null],
      hijabTypeId: [null],
      quranRecitationId: [null],
      tabligueFrequencyId: [null],
      religionParameters: [null],
    });
  }

  private getParametersByPersonId(personId: string) {
    if (personId) {
      this.religionParams$ = this.religionService.getReligionParameters(personId);
    }
  }

  private getCastesByPersonId(personId: string) {
    if (personId) {
      this.castes$ = this.service.getCastes(personId);
    }
  }
}
