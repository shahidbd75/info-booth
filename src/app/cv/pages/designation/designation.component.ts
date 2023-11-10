import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateRequestModel, UpdateRequestModel } from '../../types/common-request-type';
import { CommonResponseModel } from '../../types/common-response-type';
import { DesignationService } from '../../services/designation.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit, OnDestroy {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private designationService: DesignationService, private router: Router,
              private activatedRoute: ActivatedRoute) {

  } 

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      banglaName: ['', [Validators.required]]
    });
    
    this.loadData();
  }

  onSave() {
    const requestModel: CreateRequestModel = this.formGroup.value;

    this.subscription.add(this.designationService.save(requestModel).subscribe(()=> {
      this.router.navigate(['cv/designations']);
    },()=> console.log('Not saved')));
  }

  onUpdate() {
    const requestModel: UpdateRequestModel = this.formGroup.value;

    this.subscription.add(this.designationService.update(requestModel).subscribe(()=> {
      this.router.navigate(['cv/designations']);
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
        this.subscription.add(this.designationService.getById<CommonResponseModel>(id).subscribe((data: CommonResponseModel) => {
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
