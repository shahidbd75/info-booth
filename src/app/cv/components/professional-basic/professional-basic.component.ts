import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/personnel/services/person.service';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Component({
  selector: 'app-professional-basic',
  templateUrl: './professional-basic.component.html',
  styleUrls: ['./professional-basic.component.scss']
})
export class ProfessionalBasicComponent implements OnInit, OnDestroy {

  professionalFormGroup: FormGroup;
  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();

  constructor(private fb: FormBuilder, private personService: PersonService){}

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
