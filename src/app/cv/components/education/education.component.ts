import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

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
  }
  ngOnDestroy(): void {
    console.log('destroyed')
  }

}
