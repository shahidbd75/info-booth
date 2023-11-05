import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { CvOptionsService } from '../../services/cv-options.service';
import { ExperienceService } from '../../services/experience.service';
import { ExperienceRequestModel, ExperienceResponseType } from '../../types/experience-types';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  personId: string;
  IsEditMode = false;
  columns: string[] = ['companyName','designation','jobNature','startDate','endDate', 'actions'];
  dataSource: MatTableDataSource<ExperienceResponseType>;
  subscription: Subscription = new Subscription();
  designations$ : Observable<OptionsModel[]> = this.cvOptionsService.getDesignations();
  jobNatures$ : Observable<OptionsModel[]> = this.cvOptionsService.getJobNatures();
  constructor(private fb: FormBuilder, private cvOptionsService: CvOptionsService, private experienceService: ExperienceService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeForm();

    this.loadAllEducation();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const {...restValue} = this.formGroup.value;

    const requestModel: ExperienceRequestModel = {...restValue };
    if(requestModel.id && requestModel.id !== '') {
      this.subscription.add(
        this.experienceService.update<ExperienceRequestModel, unknown>(requestModel).subscribe(()=> {
          this.loadAllEducation();
          this.formGroup.reset({personId: this.personId});
          this.IsEditMode = false;
          console.log('Updated');
        }, () => console.log('Failed'))
      );
    } else {
      this.subscription.add(
        this.experienceService.save<ExperienceRequestModel, unknown>(requestModel).subscribe(()=> {
          this.loadAllEducation();
          this.IsEditMode = false;
          this.formGroup.reset({personId: this.personId});
        }, () => console.log('Failed'))
      );
    }    
  }

  onClear() {
    this.formGroup.reset();
  }

  loadAllEducation() : void {
    this.activatedRoute.params.subscribe({ next: (params: Params) => {
      this.personId = params['id'];

      if(this.personId) {
        this.subscription.add(this.experienceService.getExperiencesByPersonId(this.personId)
        .subscribe((response: ExperienceResponseType[]) => {
          this.dataSource = new MatTableDataSource(response);
        }, err => console.log(err))
        );
      }
    }, error: (err) => {
      console.log(err);
    }})
  }

  onEdit(data: ExperienceResponseType) {
    const { designationName, isActive,createdDate,jobNatureName, ...restValue} = data;
    this.IsEditMode = true;
    this.formGroup.setValue(restValue);
  }

  onDelete(data:ExperienceResponseType) {
    if(confirm('Do you want to delete') && data.id !== '') {
      this.subscription.add(this.experienceService.remove(data.id).subscribe(() => {
        this.loadAllEducation();
      }, (err) => console.log(err)));
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      id: [null],
      personId: [this.personId, [Validators.required]],
      designationId: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress: [''],
      startDate: [null],
      endDate: [null],
      companyUrl: [''],
      responsibilities: [''],
      jobNature: [''],
      description: [''],
    });
  }
}
