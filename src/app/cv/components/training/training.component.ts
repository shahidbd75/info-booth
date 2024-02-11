import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { CvOptionsService } from '../../services/cv-options.service';
import { TrainingService } from '../../services/training.service';
import { TrainingCreateRequestTypes, TrainingResponseTypes, TrainingUpdateRequestTypes } from '../../types/training-types';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  personId: string;
  IsEditMode = false;
  columns: string[] = ['topic', 'organization', 'duration', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<TrainingResponseTypes>;
  subscription: Subscription = new Subscription();
  designations$: Observable<OptionsModel[]> = this.cvOptionsService.getDesignations();
  jobNatures$: Observable<OptionsModel[]> = this.cvOptionsService.getJobNatures();
  constructor(
    private fb: FormBuilder,
    private cvOptionsService: CvOptionsService,
    private trainingService: TrainingService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.loadAllTrainings();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const { ...restValue } = this.formGroup.value;

    const requestModel: TrainingUpdateRequestTypes = { ...restValue, personId: this.personId };
    if (requestModel.id && requestModel.id !== '') {
      this.subscription.add(
        this.trainingService.update<TrainingUpdateRequestTypes, unknown>(requestModel).subscribe({
          next: () => {
            this.loadAllTrainings();
            this.formGroup.reset({ personId: this.personId });
            this.IsEditMode = false;
            this.notificationService.success(NotificationMessage.UpdatedSuccessfully);
          },
          error: err => {
            console.log('Failed', err);
            this.notificationService.error(NotificationMessage.UpdatedFailure);
          },
        })
      );
    } else {
      this.subscription.add(
        this.trainingService.save<TrainingCreateRequestTypes, unknown>(requestModel).subscribe({
          next: () => {
            this.loadAllTrainings();
            this.IsEditMode = false;
            this.notificationService.success(NotificationMessage.SavedSuccessfully);
            this.formGroup.reset({ personId: this.personId });
          },
          error: err => {
            this.notificationService.error(NotificationMessage.SavedFailure);
            console.log('Failed', err);
          },
        })
      );
    }
  }

  onClear() {
    this.formGroup.reset();
  }

  loadAllTrainings(): void {
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.personId = params['id'];

        if (this.personId) {
          this.subscription.add(
            this.trainingService.getListsByPersonId(this.personId).subscribe({
              next: (response: TrainingResponseTypes[]) => {
                this.dataSource = new MatTableDataSource(response);
              },
              error: err => console.log(err),
            })
          );
        }
      },
      error: err => {
        console.log(err);
      },
    });
  }

  onEdit(data: TrainingResponseTypes) {
    const { isActive, createdDate, ...restValue } = data;
    this.IsEditMode = true;
    this.formGroup.setValue(restValue);
  }

  onDelete(data: TrainingResponseTypes) {
    if (confirm('Do you want to delete') && data.id !== '') {
      this.subscription.add(
        this.trainingService.remove(data.id).subscribe({
          next: () => {
            this.notificationService.success(NotificationMessage.DeletedSuccessfully);
            this.loadAllTrainings();
          },
          error: err => {
            this.notificationService.error(NotificationMessage.DeleteFailure);
            console.log(err);
          },
        })
      );
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      id: [null],
      personId: [null],
      topic: ['', [Validators.required]],
      organization: [null],
      startDate: [null],
      endDate: [null],
      duration: [''],
    });
  }
}
