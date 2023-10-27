import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-professional-basic',
  templateUrl: './professional-basic.component.html',
  styleUrls: ['./professional-basic.component.scss']
})
export class ProfessionalBasicComponent implements OnInit, OnDestroy {

  professionalFormGroup: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.professionalFormGroup = this.fb.group({
      personId: ['', [Validators.required]],
      careerObjective: [''],
      strength:[''],
      linkedInProfileLink:[''],
      extraCurriculumActivities: [''],
      personalCapabilities:[''],
      hobby: [''],
      certification: [''],
      passportSizePhotoUrl: [''],
      signatureUrl: [''],
      otherSkills: ['']
    });

    console.log('onInit');
  }

  ngOnDestroy(): void {
    console.log('onDestroy');
  }

}
