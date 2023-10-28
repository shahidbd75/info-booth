import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProfessionalBasicService } from '../../services/professional-basic.service';
import { ProfessionalBasicRequestModel } from '../../types/professional-basic-types';
import { ProfessionalCvDataService } from '../../services/professional-cv-data.service';

@Component({
  selector: 'app-professional-basic',
  templateUrl: './professional-basic.component.html',
  styleUrls: ['./professional-basic.component.scss']
})
export class ProfessionalBasicComponent implements OnInit, OnDestroy {

  @Input() PersonId: string | null;
  professionalFormGroup: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private professionalBasicService: ProfessionalBasicService, 
    private dataService: ProfessionalCvDataService){}

  ngOnInit(): void {
    this.professionalFormGroup = this.fb.group({
      personId: [this.dataService.selectedPersonId, [Validators.required]],
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
  }

  onSave() {
    const requestModel: ProfessionalBasicRequestModel = this.professionalFormGroup.value;
    this.subscription.add(this.professionalBasicService.save<ProfessionalBasicRequestModel,unknown>(requestModel).subscribe(()=> {
      console.log('Saved')
    }, (err)=> console.log(err)))
  }

  onClear() {
    this.professionalFormGroup.reset();
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
