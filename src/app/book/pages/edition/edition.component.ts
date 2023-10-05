import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditionService } from '../../services/edition.service';
import { EditionCreateRequestModel, EditionResponseModel, EditionUpdateRequestModel } from '../../types/edition-model';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit, OnDestroy{
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private editionService: EditionService, private router: Router,
              private activatedRoute: ActivatedRoute) {

  } 

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
    });
    
    this.loadData();
  }

  onSave() {
    const requestModel: EditionCreateRequestModel = this.formGroup.value;

    this.subscription.add(this.editionService.save(requestModel).subscribe(()=> {
      this.router.navigate(['book/editions']);
    },()=> console.log('Not saved')));
  }

  onUpdate() {
    const requestModel: EditionUpdateRequestModel = this.formGroup.value;

    this.subscription.add(this.editionService.update(requestModel).subscribe(()=> {
      this.router.navigate(['book/editions']);
    },()=> console.log('Not updated')));
  }

  resetForm() {
    if(this.isEditMode) {
      this.router.navigate(['book/editions']);
    } else {
      this.formGroup.reset();
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }  

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if(id) {
        this.subscription.add(this.editionService.getById<EditionResponseModel>(id).subscribe((data: EditionResponseModel) => {
          const {createdDate, isActive, ...restValue} = data;
          this.formGroup.setValue({
            ...restValue
          });
        }));

        this.isEditMode = true;
      }
    })
  }
}
