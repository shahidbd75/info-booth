import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { PersonCreateRequestModel, PersonUpdateRequestModel } from '../../types/person.model';
import { Observable } from 'rxjs';
import { OccupationService } from '../../services/occupation.service';
import { OptionsService } from 'src/app/shared/services/options.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit{
  personForm: FormGroup;
  isEditMode = false;
  religions$: Observable<OptionsModel[]> = this.optionsService.getReligions();
  degrees$: Observable<OptionsModel[]> = this.optionsService.getDegrees();
  villages$: Observable<OptionsModel[]>;
  occupations$: Observable<OptionsModel[]>;
  selectedDistrictId: number;
  selectedUpazilaId: number;
  selectedVillageId: string;

  constructor(private formBuilder: FormBuilder, private personService: PersonService,
    private router: Router, public occupationService: OccupationService, private optionsService: OptionsService) {
    this.createForm();
  }
  ngOnInit(): void {

    this.loadPerson();
    this.loadOccupation();
  }

  private loadPerson() {
    if (this.personService.selectedPerson) {
      const { districtId, upazilaId, villageId,occupationId,occupationName,districtName,upazilaName,villageName, degreeName, ...person } = this.personService.selectedPerson;
      this.personForm.setValue({ ...person, villageId, occupation:occupationId});
      this.isEditMode = true;

      this.selectedDistrictId = districtId;
      this.selectedUpazilaId = upazilaId;
      this.selectedVillageId = villageId;

      this.personService.selectedPerson = null;
    }
  }

  onPersonAdd() {
    const {gender,occupation, religion,... restValue} = this.personForm.value;
    const requestModel: PersonCreateRequestModel = {...restValue, gender: +gender, occupationId: +occupation,
    religion: +religion};

    this.personService.savePersons(requestModel).subscribe(value => {
      this.personForm.reset();
      this.router.navigate(['/personnel/persons']);
    });
  }

  onPersonUpdate() {
    const {gender,occupation, religion,... restValue} = this.personForm.value;
    const requestModel: PersonUpdateRequestModel = {...restValue,  gender: +gender, occupationId: +occupation,
      religion: +religion};

    this.personService.updatePersons(requestModel).subscribe(value => {
      this.personForm.reset();
      this.router.navigate(['/personnel/persons']);
    });
  }

  resetForm() {
    this.personForm.reset({villageId: this.selectedVillageId});
  }

  onVillageChange(villageId: string) {
    this.personForm.patchValue({villageId});
  }

  loadOccupation() {
    this.occupations$ = this.occupationService.getOccupationsOption();
  }

  createForm() {
    this.personForm = this.formBuilder.group({
      id: [''],
      name: ['',[Validators.required]],
      nickName:['',Validators.maxLength(50)],
      fatherName: [''],
      motherName: [''],
      spouseName: [''],
      phone: ['', [Validators.required]],
      alternativeContact: [''],
      address: ['',[Validators.required]],
      email: ['', Validators.email],
      religion: [null, Validators.required],
      gender: [null, [Validators.required]],
      occupation: [null, Validators.required],
      bloodGroup: ['',Validators.maxLength(3)],
      nId: [''],
      dateOfBirth:[null],
      postalCode: [''],
      degreeId: [null],
      villageId:[null, Validators.required]
    });
  }
}
