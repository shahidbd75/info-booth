import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ProfessionalBasicService } from '../../services/professional-basic.service';
import { ProfessionalBasicRequestModel, ProfessionalBasicResponseModel } from '../../types/professional-basic-types';
import { CvEnumOptionsService } from '../../services/cv-enum-options.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ActivatedRoute, Params } from '@angular/router';
import { CvOptionsService } from '../../services/cv-options.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';

@Component({
  selector: 'app-professional-basic',
  templateUrl: './professional-basic.component.html',
  styleUrls: ['./professional-basic.component.scss']
})
export class ProfessionalBasicComponent implements OnInit, OnDestroy {
  professionalFormGroup: FormGroup;
  subscription: Subscription = new Subscription();
  isEditMode = false;
  personId: string;
  strengths$: Observable<OptionsModel[]> = this.enumOptionsService.getStrengths();
  skills$: Observable<OptionsModel[]> = this.enumOptionsService.getSkills();
  hobbies$: Observable<OptionsModel[]> = this.cvOptionsService.getHobbies();
  constructor(private fb: FormBuilder, private professionalBasicService: ProfessionalBasicService, 
    private activatedRoute: ActivatedRoute, private enumOptionsService: CvEnumOptionsService, 
    private cvOptionsService: CvOptionsService, private notificationService: NotificationService,){}

  ngOnInit(): void {
    this.initializeForm();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.personId = params['id'];
      if(this.personId) {
        this.professionalBasicService.getById<ProfessionalBasicResponseModel>(this.personId).subscribe({next:(response: ProfessionalBasicResponseModel) => {
          this.setFormData(response);
        },error: () => console.log('Failed')});
      }
    })
    
  }

  onSave() {
    const requestModel: ProfessionalBasicRequestModel = this.professionalFormGroup.value;
    requestModel.personId = this.activatedRoute.snapshot.params['id'];
    if(this.isEditMode) {
      this.subscription.add(this.professionalBasicService.update<ProfessionalBasicRequestModel,unknown>(requestModel).subscribe({next:()=> {
        this.notificationService.success(NotificationMessage.UpdatedSuccessfully);
      }, error: (err)=> {
        console.log(err);
        this.notificationService.error(NotificationMessage.UpdatedFailure);
      }}));
    } else {
      this.subscription.add(this.professionalBasicService.save<ProfessionalBasicRequestModel,unknown>(requestModel).subscribe({next:()=> {
        this.notificationService.success(NotificationMessage.SavedSuccessfully);
      }, error: (err)=> {
        console.log(err);
        this.notificationService.error(NotificationMessage.SavedFailure);
      }}));
    }    
  }

  onClear() {
    this.professionalFormGroup.reset();
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  private setFormData(response: ProfessionalBasicResponseModel) {
    if(response) {
      this.isEditMode = true;
      const {strength,otherSkills, ...restValue} = response;
      this.professionalFormGroup.patchValue({
        ...restValue,
        strength: strength.split(','),
        otherSkills: otherSkills.split(',')
      });
    }
  }

  private initializeForm() {
    this.professionalFormGroup = this.fb.group({
      personId: [null],
      careerObjective: [''],
      strength: [null],
      linkedInProfileLink: [''],
      extraCurriculumActivities: [''],
      personalCapabilities: [''],
      hobby: [null],
      certification: [''],
      passportSizePhotoUrl: [''],
      signatureUrl: [''],
      otherSkills: ['']
    });
  }
}
