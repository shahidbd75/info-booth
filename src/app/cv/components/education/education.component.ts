import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvOptionsService } from '../../services/cv-options.service';
import { Observable, Subscription } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { MatTableDataSource } from '@angular/material/table';
import { EducationService } from '../../services/education.service';
import { EducationalResponseType } from '../../types/educational-types';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  columns: string[] = ['degreeName','subjectName','instituteName','group','result', 'actions'];
  dataSource: MatTableDataSource<EducationalResponseType>;
  subscription: Subscription = new Subscription();
  degrees$ : Observable<OptionsModel[]> = this.cvOptionsService.getDegrees();
  subjects$ : Observable<OptionsModel[]> = this.cvOptionsService.getSubjects();
  constructor(private fb: FormBuilder, private cvOptionsService: CvOptionsService, private educationService: EducationService) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      cvId:          [''],
      degreeId:      [''],
      subjectId:     [''],
      instituteName: [''],
      startDate:     [''],
      endDate:       [''],
      group:         [''],
      result:        [''],
      gpa:           [''],
      gpaOutOf:      [''],
      passingYear:   [''],
    });

    this.loadAllEducation();
  }
  ngOnDestroy(): void {
    console.log('destroyed')
  }

  onSave() {
    console.log(this.formGroup.value);
  }

  onClear() {
    this.formGroup.reset();
  }

  loadAllEducation() : void {
    this.subscription.add(this.educationService.getAll<EducationalResponseType>()
    .subscribe((response: EducationalResponseType[]) => {
      this.dataSource = new MatTableDataSource(response);
    }, err => console.log(err))
    );
  }

  onEdit(data: EducationalResponseType) {

  }

  onDelete(data:EducationalResponseType) {

  }
}
