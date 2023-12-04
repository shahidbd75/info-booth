import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreferableService } from '../../services/preferable.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PreferableCreateRequestType, PreferableReponseType } from '../../types/preferable-types';

@Component({
  selector: 'app-preferable',
  templateUrl: './preferable.component.html',
  styleUrls: ['./preferable.component.scss']
})
export class PreferableComponent implements OnInit, OnDestroy {
  preferableFormGroup: FormGroup;
  subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private preferableService: PreferableService) {

  }
  ngOnInit(): void {
    this.initializeFormGroup();

    this.activatedRoute.params.subscribe({
      next: (params:Params) => {
        const id = params['id'];
        console.log(id);
        if(id) {
          this.loadData(id);
        }
      }
    })
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const requestModel: PreferableCreateRequestType = this.preferableFormGroup.value;

    requestModel.personId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.preferableService.update<PreferableCreateRequestType, unknown>(requestModel).subscribe({
      next: () => {
        console.log('Saved');
      },
      error: () => console.log('NotSaved')
    });
  }

  onClear() {
    this.preferableFormGroup.reset();
  }

  private loadData(personId: string) {
    this.preferableService.getById<PreferableReponseType>(personId).subscribe({
      next: (response: PreferableReponseType) => {
        if(response) {
          const { ...restValue } = response;
          this.preferableFormGroup.setValue({...restValue});
        }
      }
    , error: (error) => console.log(error)
    })
  }

  private initializeFormGroup() {
    this.preferableFormGroup = this.fb.group({
      personId:  [null],
      height:    [null],
      complexion:[null],
    });
  }

}
