import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DegreeService } from '../../services/degree.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateRequestModel, UpdateRequestModel } from '../../types/common-request-type';
import { CommonResponseModel } from '../../types/common-response-type';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit, OnDestroy {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private degreeService: DegreeService, private router: Router,
              private activatedRoute: ActivatedRoute) {

  } 

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      banglaName: [''],
      order: [0, [Validators.required]]
    });
    
    this.loadData();
  }

  onSave() {
    const requestModel: CreateRequestModel = this.formGroup.value;

    this.subscription.add(this.degreeService.save(requestModel).subscribe(()=> {
      this.router.navigate(['cv/degrees']);
    },()=> console.log('Not saved')));
  }

  onUpdate() {
    const requestModel: UpdateRequestModel = this.formGroup.value;

    this.subscription.add(this.degreeService.update(requestModel).subscribe(()=> {
      this.router.navigate(['cv/degrees']);
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
        this.subscription.add(this.degreeService.getById<CommonResponseModel>(id).subscribe((data: CommonResponseModel) => {
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
