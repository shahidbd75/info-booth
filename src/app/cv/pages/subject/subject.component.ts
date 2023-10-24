import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateRequestModel, UpdateRequestModel } from '../../types/common-request-type';
import { CommonResponseModel } from '../../types/common-response-type';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private subjectService: SubjectService, private router: Router,
              private activatedRoute: ActivatedRoute) {

  } 

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      banglaName: ['']
    });
    
    this.loadData();
  }

  onSave() {
    const requestModel: CreateRequestModel = this.formGroup.value;

    this.subscription.add(this.subjectService.save(requestModel).subscribe(()=> {
      this.router.navigate(['cv/subjects']);
    },()=> console.log('Not saved')));
  }

  onUpdate() {
    const requestModel: UpdateRequestModel = this.formGroup.value;

    this.subscription.add(this.subjectService.update(requestModel).subscribe(()=> {
      this.router.navigate(['cv/subjects']);
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
        this.subscription.add(this.subjectService.getById<CommonResponseModel>(id).subscribe((data: CommonResponseModel) => {
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
