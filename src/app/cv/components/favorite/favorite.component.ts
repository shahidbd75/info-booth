import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatrimonialReponseType } from '../../types/matrimonial-basic-types';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { FavoriteRequestType } from '../../types/matrimonial-favorite-types';
import { FavoriteService } from '../../services/favorite.service';
import { CvEnumOptionsComponent } from '../matrimonial-basic/matrimonial-basic-options.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent extends CvEnumOptionsComponent implements OnInit, OnDestroy {
  favoriteFormGroup: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private favoriteService: FavoriteService,
    private activatedRoute: ActivatedRoute) {
      super();
  }


  ngOnInit(): void {
    this.initializeFormGroup();

    this.activatedRoute.params.subscribe({
      next: (params:Params) => {
        const id: string = params['id'];
        if(id) {
          this.loadData(id);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const requestModel: FavoriteRequestType = this.favoriteFormGroup.value;

    requestModel.personId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.favoriteService.update<FavoriteRequestType, unknown>(requestModel).subscribe({
      next: () => {
        console.log('Saved');
      },
      error: () => console.log('NotSaved')
    });
  }

  onClear() {
    this.favoriteFormGroup.reset();
  }

  private loadData(personId: string) {
    this.favoriteService.getById<MatrimonialReponseType>(personId).subscribe({
      next: (response: MatrimonialReponseType) => {
        if(response) {
          const {id: personId, ...restValue } = response;
          this.favoriteFormGroup.setValue({personId, ...restValue});
        }
      }
    , error: (error) => console.log(error)
    })
  }

  private initializeFormGroup() {
    this.favoriteFormGroup = this.fb.group({
      personId: [null],
      cloth:    [null],
      bird:     [null],
      animal:   [null],
      food:     [null],
      pet:      [null],
      fish:     [null],
      fruit:    [null],
      vehicle:  [null],
      book:     [null],
      sport:    [null],
      movie:    [null],
      website:  [null],
      cooking:  [null],
      game:     [null],
      music:    [null],
      read:     [null],
      tvShow:   [null],
    });
  }
}
