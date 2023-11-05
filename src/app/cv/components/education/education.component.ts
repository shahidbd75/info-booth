import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvOptionsService } from '../../services/cv-options.service';
import { Observable, Subscription } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { MatTableDataSource } from '@angular/material/table';
import { EducationService } from '../../services/education.service';
import { EducationRequestType, EducationalResponseType } from '../../types/educational-types';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  personId: string;
  columns: string[] = ['degreeName','subjectName','instituteName','group','result', 'actions'];
  dataSource: MatTableDataSource<EducationalResponseType>;
  subscription: Subscription = new Subscription();
  degrees$ : Observable<OptionsModel[]> = this.cvOptionsService.getDegrees();
  subjects$ : Observable<OptionsModel[]> = this.cvOptionsService.getSubjects();
  constructor(private fb: FormBuilder, private cvOptionsService: CvOptionsService, private educationService: EducationService,
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

    const requestModel: EducationRequestType = {...restValue };
    if(requestModel.id) {
      this.subscription.add(
        this.educationService.update<EducationRequestType, unknown>(requestModel).subscribe({
          next: ()=> {
            this.loadAllEducation();
            this.formGroup.reset();
          }, error: () => console.log('Failed')
        })
      );
    } else {
      this.subscription.add(
        this.educationService.save<EducationRequestType, unknown>(requestModel).subscribe({
          next: ()=> {
            this.loadAllEducation();
            this.formGroup.reset();
          }, error: () => console.log('Failed')
        })
      );
    }
  }

  onClear() {
    this.formGroup.reset();
  }

  loadAllEducation() : void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.personId = params['id'];
      if(this.personId !== '') {
        this.subscription.add(
          this.educationService.getAllByPersonId(this.personId)
          .subscribe({ next: (response: EducationalResponseType[]) => {
            this.dataSource = new MatTableDataSource(response);
          },error: err => console.log(err)
        })
        );
      }
    });
     
  }

  onEdit(data: EducationalResponseType) {
    const {createdDate, degreeName, subjectName, isActive,startDate, endDate,...restValue} = data;
    this.formGroup.setValue({
      ...restValue, startDate: new Date(startDate).toDateString(),endDate: new Date(endDate).toString()
    });
  }

  onDelete(data:EducationalResponseType) {
    if(confirm('Do you want to delete') && data.id !== '') {
      this.subscription.add(this.educationService.remove(data.id).subscribe({ next: () => {
        this.loadAllEducation();
      }, error: (err) => console.log(err)}));
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      id: [null],
      personId: [this.personId, [Validators.required]],
      degreeId: ['', [Validators.required]],
      subjectId: ['', [Validators.required]],
      instituteName: [''],
      startDate: [''],
      endDate: [''],
      group: [''],
      result: [''],
      gpa: [''],
      gpaOutOf: [''],
      passingYear: [''],
    });
  }
}
