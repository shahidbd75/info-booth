import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvOptionsService } from '../../services/cv-options.service';
import { Observable, Subscription } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { MatTableDataSource } from '@angular/material/table';
import { EducationService } from '../../services/education.service';
import { EducationRequestType, EducationalResponseType } from '../../types/educational-types';
import { ProfessionalCvDataService } from '../../services/professional-cv-data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  @Input({required: true}) PersonId: string | null;
  columns: string[] = ['degreeName','subjectName','instituteName','group','result', 'actions'];
  dataSource: MatTableDataSource<EducationalResponseType>;
  subscription: Subscription = new Subscription();
  degrees$ : Observable<OptionsModel[]> = this.cvOptionsService.getDegrees();
  subjects$ : Observable<OptionsModel[]> = this.cvOptionsService.getSubjects();
  constructor(private fb: FormBuilder, private cvOptionsService: CvOptionsService, private educationService: EducationService,
    private dataService: ProfessionalCvDataService) {}

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
    this.subscription.add(
      this.educationService.save<EducationRequestType, unknown>(requestModel).subscribe(()=> {
        this.loadAllEducation();
        this.formGroup.reset();
      }, () => console.log('Failed'))
    );
  }

  onClear() {
    this.formGroup.reset();
  }

  loadAllEducation() : void {
    if(this.dataService.selectedPersonId) {
      this.subscription.add(this.educationService.getAllByPersonId(this.dataService.selectedPersonId)
      .subscribe((response: EducationalResponseType[]) => {
        this.dataSource = new MatTableDataSource(response);
      }, err => console.log(err))
      );
    }  
  }

  onEdit(data: EducationalResponseType) {
    this.formGroup.setValue(data);
  }

  onDelete(data:EducationalResponseType) {
    if(confirm('Do you want to delete') && data.id !== '') {
      this.subscription.add(this.educationService.remove(data.id).subscribe(() => {
        this.loadAllEducation();
      }, (err) => console.log(err)));
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      personId: [this.dataService.selectedPersonId, [Validators.required]],
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
