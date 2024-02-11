import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvOptionsService } from '../../services/cv-options.service';
import { Observable, Subscription } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { MatTableDataSource } from '@angular/material/table';
import { EducationService } from '../../services/education.service';
import { EducationRequestType, EducationalResponseType } from '../../types/educational-types';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  columns: string[] = ['degreeName', 'subjectName', 'instituteName', 'group', 'passingYear', 'actions'];
  dataSource: MatTableDataSource<EducationalResponseType>;
  subscription: Subscription = new Subscription();
  degrees$: Observable<OptionsModel[]> = this.cvOptionsService.getDegrees();
  subjects$: Observable<OptionsModel[]> = this.cvOptionsService.getSubjects();
  constructor(
    private fb: FormBuilder,
    private cvOptionsService: CvOptionsService,
    private educationService: EducationService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.loadAllEducation();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const personId = this.activatedRoute.snapshot.paramMap.get('id')?.toString();

    if (!personId) {
      return;
    }

    const requestModel: EducationRequestType = this.mapRequestData(personId);

    if (requestModel.id) {
      this.subscription.add(
        this.educationService.update<EducationRequestType, unknown>(requestModel).subscribe({
          next: () => {
            this.notificationService.success(NotificationMessage.UpdatedSuccessfully);
            this.loadAllEducation();
            this.formGroup.reset();
          },
          error: () => {
            this.notificationService.error(NotificationMessage.UpdatedFailure);
          },
        })
      );
    } else {
      this.subscription.add(
        this.educationService.save<EducationRequestType, unknown>(requestModel).subscribe({
          next: () => {
            this.notificationService.success(NotificationMessage.SavedSuccessfully);
            this.loadAllEducation();
            this.formGroup.reset();
          },
          error: () => {
            this.notificationService.error(NotificationMessage.SavedFailure);
          },
        })
      );
    }
  }

  onClear() {
    this.formGroup.reset();
  }

  loadAllEducation(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const personId = params['id'];
      if (personId !== '') {
        this.subscription.add(
          this.educationService.getAllByPersonId(personId).subscribe({
            next: (response: EducationalResponseType[]) => {
              this.dataSource = new MatTableDataSource(response);
            },
            error: err => console.log(err),
          })
        );
      }
    });
  }

  onEdit(data: EducationalResponseType) {
    const { createdDate, degreeName, subjectName, isActive, startDate, endDate, ...restValue } = data;
    this.formGroup.setValue({
      ...restValue,
      startDate: new Date(startDate).toDateString(),
      endDate: new Date(endDate).toString(),
    });
  }

  onDelete(data: EducationalResponseType) {
    if (confirm('Do you want to delete') && data.id !== '') {
      this.subscription.add(
        this.educationService.remove(data.id).subscribe({
          next: () => {
            this.notificationService.success(NotificationMessage.DeletedSuccessfully);
            this.loadAllEducation();
          },
          error: err => {
            console.log(err);
            this.notificationService.error(NotificationMessage.DeleteFailure);
          },
        })
      );
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      id: [null],
      personId: [null],
      degreeId: [null, [Validators.required]],
      subjectId: [null],
      instituteName: ['', [Validators.required]],
      startDate: [null],
      endDate: [null],
      group: [''],
      result: [''],
      gpa: [null],
      gpaOutOf: [null],
      passingYear: [null, [Validators.required]],
    });
  }

  private mapRequestData(personId: string): EducationRequestType {
    const formData = this.formGroup.value;

    return {
      degreeId: formData.degreeId,
      personId: personId,
      subjectId: formData.subjectId ?? null,
      instituteName: formData.instituteName,
      passingYear: +formData.passingYear,
      group: formData.group,
      startDate: !this.isNullOrEmpty(formData.startDate) ? new Date(formData.startDate) : null,
      endDate: !this.isNullOrEmpty(formData.endDate) ? new Date(formData.endDate) : null,
      gpa: +formData.gpa ?? null,
      gpaOutOf: +formData.gpaOutOf ?? null,
      id: formData.id,
      result: formData.result,
    };
  }

  private isNullOrEmpty(str: string | null | undefined): boolean {
    return str == null || str.trim().length === 0;
  }
}
