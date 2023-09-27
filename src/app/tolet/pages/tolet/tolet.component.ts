import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/personnel/services/person.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ToletService } from '../../services/tolet.service';
import { ToletOptionsService } from '../../services/tolet-options.service';
import { ToLetCreateRequestModel, ToLetUpdateRequestModel } from '../../types/tolet-request-model';

@Component({
  selector: 'app-tolet',
  templateUrl: './tolet.component.html',
  styleUrls: ['./tolet.component.scss']
})
export class ToletComponent {
  toletForm: FormGroup;
  isEditMode = false;
  selectedDistrictId: number;
  selectedUpazilaId: number;
  selectedVillageId: string;

  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  rentType: OptionsModel[] = [{id:1, name:'Family'},{id:2, name:'Bachelor'},{id:3, name:'Sublet'}]
  views: OptionsModel[] = [{id:1, name:'South View'},{id:2, name:'North View'},{id:3, name:'East View'},{id:4, name:'West View'}];
  //aminities$: Observable<OptionsModel[]> = 
  //landmarks$: Observable<OptionsModel[]> = this.workerService.getWorkGroups();

  constructor(private fb: FormBuilder, private router: Router, private toletService: ToletService, 
    private personService: PersonService, private activatedRoute: ActivatedRoute, public optionService: ToletOptionsService,) {

  }
  ngOnInit(): void {
    this.initializeFormGroup();
    this.loadData();
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
      isRentNegotiable: [0, [Validators.required]],
      availableFrom: [null, [Validators.required]],
      advanceMoney:[0],
      floorNumber: [null],
      totalFloor:[null],
      numberOfBed:[null],
      numberOfBath:[null],
      description: ['', [Validators.maxLength(250)]],
      areaInSqFeet: [false],
      rentType:[null],
      view:[null],
      hasGenerator:[null],
      isBachelorAllowed:[null],
      hasParking:[null],
      careTakerName:[null],
      careTakerPhone:[null],
      landMarkIds:[null],
      amenities:[null],
      preferableReligion:[null],
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

  private formatTime(inputTime: string): string {
    const date = new Date();
    if(inputTime) {
      date.setHours(+inputTime.split(':')[0]);
      date.setMinutes(+inputTime.split(':')[1])
    }

    return date.toLocaleTimeString([], {timeStyle:'short'});
  }
  private loadFromParam() {
    // this.activatedRoute.params.subscribe((param: Params) => {
    //   const { id } = param;
    //   if (id) {
    //     this.toletService.getWorkerById(id).subscribe((worker: WorkerResponseModel) => {
    //       this.toletForm.patchValue(worker);
    //     });
    //   }
    // });
  }
}
