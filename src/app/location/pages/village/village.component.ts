import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VillageService } from '../../services/village.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VillageCreateRequestModel, VillageListResponseModel, VillageUpdateRequestModel } from '../../types/village.model';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit{
  villageForm: FormGroup;
  isEditMode = false;
  subscription$: Subscription;
  constructor(private fb: FormBuilder, private villageService: VillageService, private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.initializeForm();
    this.subscription$ = this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id']; 
      if(id) {
        this.isEditMode = true;
        this.villageService.getVillage(+id).subscribe((village:VillageListResponseModel) => {
          this.villageForm.setValue(village);
        });        
      }
    });
  }

  initializeForm() {
    this.villageForm = this.fb.group({
      id: [null],
      district:[null],
      upazila: [null],
      name: ['',[Validators.required]],
      banglaName:['']
    });
  }

  onOccupationAdd() {
    const requestModel: VillageCreateRequestModel = this.villageForm.value;
    
    this.villageService.saveVillage(requestModel).subscribe(() => {

      this.reset();
    });
  }

  onOccupationUpdate() {
    const updateModel: VillageUpdateRequestModel = this.villageForm.value;
    
    this.villageService.updateVillage({...updateModel,id: +updateModel.id}).subscribe(() => {
      this.reset();
    });
  }

  private reset() {
    this.villageForm.reset();
    this.router.navigate(['location/villages']);
  }
}
