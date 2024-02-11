import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { CvOptionsService } from '../../services/cv-options.service';
import { ExperienceService } from '../../services/experience.service';
import { ExperienceRequestModel, ExperienceResponseType } from '../../types/experience-types';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  personId: string;
  IsEditMode = false;
  columns: string[] = ['companyName', 'designation', 'jobNature', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<ExperienceResponseType>;
  subscription: Subscription = new Subscription();
  designations$: Observable<OptionsModel[]> = this.cvOptionsService.getDesignations();
  jobNatures$: Observable<OptionsModel[]> = this.cvOptionsService.getJobNatures();
  constructor(
    private fb: FormBuilder,
    private cvOptionsService: CvOptionsService,
    private experienceService: ExperienceService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.loadExperiences();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const { ...restValue } = this.formGroup.value;

    const personId: string = this.activatedRoute.snapshot.params['id'];

    if (!personId) {
      return;
    }
    const requestModel: ExperienceRequestModel = { ...restValue, personId };
    if (requestModel.id && requestModel.id !== '') {
      this.subscription.add(
        this.experienceService.update<ExperienceRequestModel, unknown>(requestModel).subscribe({
          next: () => {
            this.notificationService.success(NotificationMessage.UpdatedSuccessfully);
            this.loadExperiences();
            this.formGroup.reset({ personId: this.personId });
            this.IsEditMode = false;
          },
          error: error => {
            console.log(error);

            this.notificationService.error(NotificationMessage.UpdatedFailure);
          },
        })
      );
    } else {
      this.subscription.add(
        this.experienceService.save<ExperienceRequestModel, unknown>(requestModel).subscribe({
          next: () => {
            this.notificationService.success(NotificationMessage.SavedSuccessfully);
            this.loadExperiences();
            this.IsEditMode = false;
            this.formGroup.reset({ personId: this.personId });
          },
          error: err => {
            this.notificationService.error(NotificationMessage.SavedFailure);
            console.log(err);
          },
        })
      );
    }
  }

  onClear() {
    this.formGroup.reset();
  }

  loadExperiences(): void {
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.personId = params['id'];

        if (this.personId) {
          this.subscription.add(
            this.experienceService.getExperiencesByPersonId(this.personId).subscribe({
              next: (response: ExperienceResponseType[]) => {
                this.dataSource = new MatTableDataSource(response);
              },
              error: err => console.log(err),
            })
          );
        }
      },
      error: err => {
        this.notificationService.error(NotificationMessage.ServerError);
      },
    });
  }

  onEdit(data: ExperienceResponseType) {
    const { designationName, isActive, createdDate, jobNatureName, ...restValue } = data;
    this.IsEditMode = true;
    this.formGroup.setValue(restValue);
  }

  onDelete(data: ExperienceResponseType) {
    if (confirm('Do you want to delete') && data.id !== '') {
      this.subscription.add(
        this.experienceService.remove(data.id).subscribe({
          next: () => {
            this.notificationService.success(NotificationMessage.DeletedSuccessfully);
            this.loadExperiences();
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
      designationId: [null, [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress: [''],
      startDate: [null],
      endDate: [null],
      companyUrl: [''],
      responsibilities: [''],
      jobNature: [null, [Validators.required]],
      description: [''],
    });
  }
}
