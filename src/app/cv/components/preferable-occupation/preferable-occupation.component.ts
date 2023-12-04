import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreferableOccupationService } from '../../services/preferable-occupation.service';
import { Observable } from 'rxjs';
import { PreferableOccupationsRequestType, PreferableOccupationsType } from '../../types/preferable-occupation-type';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preferable-occupation',
  templateUrl: './preferable-occupation.component.html',
  styleUrls: ['./preferable-occupation.component.scss']
})
export class PreferableOccupationComponent implements OnInit, OnDestroy {
  pOFormGroup: FormGroup;
  occupations$: Observable<PreferableOccupationsType[]> 
  = this.pOService.getOccupationsByPersonId(this.activatedRoute.snapshot.paramMap.get('id') ?? '');
  constructor(private fb: FormBuilder, private pOService: PreferableOccupationService, private activatedRoute: ActivatedRoute) {

  }

  onSave() {
    const request: PreferableOccupationsRequestType = {
      personId: this.activatedRoute.snapshot.paramMap.get('id') ?? '',
      occupationId: this.pOFormGroup.value.occupationId
    }
    this.pOService.update<PreferableOccupationsRequestType,unknown>(request).subscribe({
      next: () => {
        console.log('success');
      },
      error: ()=> {
        console.log('Error');
      }
    })
  }

  ngOnInit(): void {
    this.pOFormGroup = this.fb.group({
      occupationId: [null,[Validators.required]]
    })
  }
  ngOnDestroy(): void {
    console.log('destroy');
    
  }

}
