import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/personnel/services/person.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ToletService } from '../../services/tolet.service';
import { ToletOptionsService } from '../../services/tolet-options.service';
import { ToLetCreateRequestModel, ToLetUpdateRequestModel } from '../../types/tolet-request-model';
import { ToLetDetailResponseModel } from '../../types/tolet-response-model';

@Component({
  selector: 'app-tolet',
  templateUrl: './tolet.component.html',
  styleUrls: ['./tolet.component.scss']
})
export class ToletComponent implements OnInit{
  toletForm: FormGroup;
  isEditMode = false;
  selectedDistrictId: number;
  selectedUpazilaId: number;
  selectedVillageId: string;

  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  rentTypes$: Observable<OptionsModel[]> = this.optionService.getFlatTypes();
  views$: Observable<OptionsModel[]> = this.optionService.getFlatViews();
  aminities$: Observable<OptionsModel[]> = this.optionService.getAmenities();
  landmarks$: Observable<OptionsModel[]> = this.optionService.getLandMarks();
  religions$: Observable<OptionsModel[]> = this.optionService.getReligions();

  constructor(private fb: FormBuilder, private router: Router, private toletService: ToletService, 
    private personService: PersonService, private activatedRoute: ActivatedRoute, public optionService: ToletOptionsService,) {

  }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.loadFromParam();
  }
 
  loadData() {
    // if(this.toletService.selectedWorker) {
    //   const {id:personId,goodAts,workGroups, workAbilities, preferableDays, ...restvalues} = this.toletService.selectedWorker;
    //   const goodAtIds = goodAts.map(g => g.id);
    //   const workGroupIds = workGroups.map(wg => wg.id);
    //   const workAbilityIds = workAbilities.map(wa => wa.id);
    //   const preferableDayIds = preferableDays.map(pd => pd.id);
    //   this.isEditMode = true;
    //   this.toletForm.patchValue({...restvalues,personId, goodAts: goodAtIds, 
    //     workAbilities: workAbilityIds, perferableDays: preferableDayIds, workGroups: workGroupIds});
    //   this.toletService.selectedWorker = null;
    // }
  }
  initializeFormGroup() {
    this.toletForm = this.fb.group({
      personId: [null, [Validators.required]],
      title: ['', [Validators.required,Validators.maxLength(100)]],
      rent: ['', [Validators.required,Validators.maxLength(8)]],
      isRentNegotiable: [false, [Validators.required]],
      availableFrom: [null, [Validators.required]],
      advanceMoney:[0],
      floorNumber: [0],
      totalFloor:[0],
      numberOfBed:[0],
      numberOfBath:[0],
      description: ['', [Validators.maxLength(250)]],
      areaInSqFeet: [false],
      rentTypeId:[null],
      viewId:[null],
      hasGenerator:[false],
      isBachelorAllowed:[false],
      hasParking:[false],
      careTakerName:[null],
      careTakerPhone:[null],
      landMarkIds:[null],
      amenities:[null],
      preferableReligion:[null],
      villageId: [null, [Validators.required]]
    });
  }

  onWorkerSave() {
    console.log(this.toletForm.value);
    // const {startTime, endTime, ...restValue} = this.toletForm.value;

     const requestModel: ToLetCreateRequestModel = {...this.toletForm.value};

    this.toletService.saveToLet(requestModel).subscribe(()=> {
      this.router.navigate(['tolet/to-lets']);
    },(error) => console.log(error));
  }

  onWorkerUpdate() {
    const requestModel: ToLetUpdateRequestModel = {...this.toletForm.value};

    this.toletService.updateToLet(requestModel).subscribe(()=> {
      this.router.navigate(['tolet/to-lets']);
    },(error) => console.log(error));
  }

  resetForm() {
    this.router.navigate(['tolet/to-lets']);
  }

  onVillageChange(villageId: string) {
    this.toletForm.patchValue({villageId});
  }

  private formatTime(inputTime: string): string {
    const date = new Date();
    if(inputTime) {
      date.setHours(+inputTime.split(':')[0]);
      date.setMinutes(+inputTime.split(':')[1])
    }

    return date.toLocaleTimeString([], {timeStyle:'short'});
  }
  private loadFromParam() {
    this.activatedRoute.params.subscribe((param: Params) => {
      const { id } = param;
      if (id) {
        this.toletService.getToLetById(id).subscribe((tolet: ToLetDetailResponseModel) => {
          this.toletForm.patchValue(tolet);
        });
      }
    });
  }
}
