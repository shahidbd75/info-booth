import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, range } from 'rxjs';
import { MatrimonialBasicCvService } from '../../services/matrimonial-basic.service';
import { ActivatedRoute } from '@angular/router';
import { CvEnumOptionsComponent } from './matrimonial-basic-options.component';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Component({
  selector: 'app-matrimonial-basic',
  templateUrl: './matrimonial-basic.component.html',
  styleUrls: ['./matrimonial-basic.component.scss']
})
export class MatrimonialBasicComponent extends CvEnumOptionsComponent implements OnInit, OnDestroy {
  matrimonialFormGroup: FormGroup;
  subscription: Subscription = new Subscription();
  numbers$: Observable<OptionsModel[]>;

  constructor(private fb: FormBuilder, private matrimonialService: MatrimonialBasicCvService,
    private activatedRoute: ActivatedRoute) {
    super();
  }


  ngOnInit(): void {
    this.initializeFormGroup();
    this.loadNumbers();
  }

  loadNumbers() {
    range(1,15).subscribe(each => {
      console.log(each);
    })
  }
  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    console.log(this.matrimonialFormGroup.value);
  }

  onClear() {
    this.matrimonialFormGroup.reset();
  }

  private initializeFormGroup() {
    this.matrimonialFormGroup = this.fb.group({
      guardianRelation:   [null, [Validators.required]],
      height:             [null],
      weight:             [null],
      chest:              [null],
      passport:           [null],
      annualIncome:       [null],
      familyWealthDetail: [null],
      selfWealthDetail:   [null],
      shortTimeAmbition:  [null],
      longTimeAmbition:   [null],
      handiCrafts:        [null],
      facebookProfileLink:[null],
      presentAddress:     [null],
      expectations:       [null],
      otherSkills:        [null],
      skill:              [null],
      dressStyle:         [null],
      bodyType:           [null],
      hairColor:          [null],
      eyeColor:           [null],
      complexion:         [null],
      diet:               [null],
      disability:         [null],
      familyValue:        [null],
      personalValue:      [null],
      residencyStatus:    [null],
      haveChildren:       [null],
      caste:              [null],
      noOfBrother:        [null],
      noOfMarriedBrother: [null],
      noOfSister:         [null],
      noOfMarriedSister:  [null],
    });
  }
}
