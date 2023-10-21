import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LanguageCreateRequestModel, LanguageResponseModel, LanguageUpdateRequestModel } from '../../types/language.types';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit, OnDestroy {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private languageService: LanguageService, 
              private router: Router, private activatedRoute: ActivatedRoute) {

  } 

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      isActive:  [null]
    });
    
    this.loadData();
  }

  onSave() {
    const requestModel: LanguageCreateRequestModel = this.formGroup.value;

    this.subscription.add(this.languageService.save(requestModel).subscribe(()=> {
      this.router.navigate(['settings/languages']);
    },()=> console.log('Not saved')));
  }

  onUpdate() {
    const requestModel: LanguageUpdateRequestModel = this.formGroup.value;

    this.subscription.add(this.languageService.update(requestModel).subscribe(()=> {
      this.router.navigate(['settings/languages']);
    },()=> console.log('Not updated')));
  }

  resetForm() {
    this.formGroup.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }  

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if(id) {
        this.subscription.add(this.languageService.getById<LanguageResponseModel>(id).subscribe((data: LanguageResponseModel) => {
          const {createdDate, ...restValue} = data;
          this.formGroup.setValue({
            ...restValue
          });
        }));
        this.isEditMode = true;
      }
    })
  }
}
