import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { VillageService } from '../../services/village.service';
import { Router } from '@angular/router';
import { VillageCreateRequestModel, VillageResponseModel, VillageUpdateRequestModel } from '../../types/village.model';
import { OptionsService } from 'src/app/shared/services/options.service';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit{
  villageForm: FormGroup;
  isEditMode = false;
  subscription$: Subscription;
  upazilas$:Observable<OptionsModel[]>; 
  districts$:Observable<OptionsModel[]> = this.optionsService.getDistricts();
  constructor(private fb: FormBuilder, private villageService: VillageService, private router: Router,
    private optionsService: OptionsService,){}

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  loadData() {
    const village: VillageResponseModel | null = this.villageService.selectedVillage;

    if(village) {
      const {upazilaId, ...restValue} = village;
      this.villageForm.patchValue(restValue);
      this.loadUpazilas();
      this.villageForm.patchValue({ upazilaId });
      this.isEditMode = true;
      this.villageService.selectedVillage = null;
    }
  }

  initializeForm() {
    this.villageForm = this.fb.group({
      id: [null],
      districtId:[null],
      upazilaId: [null, [Validators.required]],
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
    
    this.villageService.updateVillage(updateModel).subscribe(() => {
      this.reset();
    });
  }

  loadUpazilas() {
    const { districtId } = this.villageForm.value;
    this.villageForm.controls['upazilaId'].reset();
    this.upazilas$ = this.optionsService.getUpazilas(districtId);
  }

  reset() {
    this.villageForm.reset();
    this.villageService.selectedVillage = null;
    this.router.navigate(['location/villages']);
  }
}
