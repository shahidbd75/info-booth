import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobReferenceService } from '../../services/job-reference.service';
import { CvOptionsService } from '../../services/cv-options.service';
import { CvEnumOptionsService } from '../../services/cv-enum-options.service';
import { ActivatedRoute, Params } from '@angular/router';
import { JobReferenceCreateRequestType, JobReferenceResponseType, JobReferenceUpdateRequestType } from '../../types/job-reference-type';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { PersonService } from 'src/app/personnel/services/person.service';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

@Component({
  selector: 'app-job-reference',
  templateUrl: './job-reference.component.html',
  styleUrls: ['./job-reference.component.scss']
})
export class JobReferenceComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  personId: string;
  IsEditMode = false;
  columns: string[] = ['personName','designation','occupation','mobile','relation', 'actions'];
  dataSource: MatTableDataSource<JobReferenceResponseType>;
  subscription: Subscription = new Subscription();
  designations$ : Observable<OptionsModel[]> = this.cvOptionsService.getDesignations();
  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  relations$: Observable<OptionsModel[]> = this.cvEnumOptionsService.getRelations();
  constructor(private fb: FormBuilder, private cvOptionsService: CvOptionsService,private cvEnumOptionsService: CvEnumOptionsService, 
    private jobReferenceService: JobReferenceService, private activatedRoute: ActivatedRoute, 
    private personService: PersonService,  private notificationService: NotificationService,) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllJobReferences();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const {...restValue} = this.formGroup.value;
    const requestModel: JobReferenceUpdateRequestType = {...restValue, personId: this.activatedRoute.snapshot.params['id'] };

    if(requestModel.id && requestModel.id !== '') {
      this.subscription.add(
        this.jobReferenceService.update<JobReferenceUpdateRequestType, unknown>(requestModel).subscribe({ next:
          ()=> {
            this.notificationService.success(NotificationMessage.UpdatedSuccessfully);
            this.loadAllJobReferences();
            this.formGroup.reset({personId: this.personId});
            this.IsEditMode = false;
          }, error: () => console.log('Failed')
        })
      );
    } else {
      this.subscription.add(
        this.jobReferenceService.save<JobReferenceCreateRequestType, unknown>(requestModel).subscribe({
          next: ()=> {
            this.notificationService.success(NotificationMessage.SavedSuccessfully);
            this.loadAllJobReferences();
            this.IsEditMode = false;
            this.formGroup.reset({personId: this.personId});
          }, error: (err) => {
            console.log(err);
            this.notificationService.error(NotificationMessage.SavedFailure);
          }
        })
      );
    }    
  }

  onClear() {
    this.formGroup.reset();
  }

  loadAllJobReferences() : void {
    this.activatedRoute.params.subscribe({ next: (params: Params) => {
      this.personId = params['id'];

      if(this.personId) {
        this.subscription.add(this.jobReferenceService.getJobReferenceByPersonId(this.personId)
        .subscribe({next: (response: JobReferenceResponseType[]) => {
          this.dataSource = new MatTableDataSource(response);
        }, error: err => console.log(err)})
        );
      }
    }, error: (err) => {
      console.log(err);
    }})
  }

  onEdit(data: JobReferenceResponseType) {
    const { designation, isActive, mobile, personName, ...restValue} = data;
    this.IsEditMode = true;
    this.formGroup.setValue({...restValue});
  }

  onDelete(data:JobReferenceResponseType) {
    if(confirm('Do you want to delete') && data.id !== '') {
      this.subscription.add(this.jobReferenceService.remove(data.id).subscribe({ next:() => {
        this.notificationService.error(NotificationMessage.DeleteFailure);
        this.loadAllJobReferences();
      }, error: (err) => console.log(err)}));
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      id: [null],
      personId: [''],
      designationId: [null, [Validators.required]],
      referencePersonId: [null, [Validators.required]],
      relation: [null,[Validators.required]],
      institute: [''],
      isActive: [null],
    });
  }
}
