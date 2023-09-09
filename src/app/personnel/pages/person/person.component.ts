import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonClientService } from '../../services/person-client.service';
import { PersonCreateRequestModel, PersonUpdateRequestModel } from '../../types/person.model';
import { PersonDataService } from '../../services/person-data.service';
import { Observable, take } from 'rxjs';
import { OccupationService } from '../../services/occupation.service';
import { OptionsService } from 'src/app/shared/services/options.service';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit{
  personForm: FormGroup;
  isEditMode = false;
  upazilas$: Observable<OptionsModel[]>;
  villages$: Observable<OptionsModel[]>;

  constructor(private formBuilder: FormBuilder, private personService: PersonClientService, public dataService: PersonDataService,
    public optionsService: OptionsService, public occupationService: OccupationService) {
    this.createForm();
  }
  districts$ = this.optionsService.getDistricts();
  ngOnInit(): void {

    this.dataService.selectedPerson$.pipe(take(1)).subscribe(_person => {
      if(_person) {
        const {dateOfBirth, ...person} = _person;
        this.personForm.setValue(person);
        this.isEditMode = true;
      }
    })
  }

  onPersonAdd() {
    const requestModel: PersonCreateRequestModel = {...this.personForm.value, gender: +this.personForm.value.gender};

    this.personService.savePersons(requestModel).subscribe(value => {
      this.personForm.reset();
    });
  }
  onPersonUpdate() {
    const requestModel: PersonUpdateRequestModel = {...this.personForm.value, gender: +this.personForm.value.gender};

    this.personService.updatePersons(requestModel).subscribe(value => {
      this.personForm.reset();
      this.isEditMode = false;
    });
  }

  loadUpazilas() {
    const { districtId } = this.personForm.value;
    this.personForm.controls['upazilaId'].reset();
    this.upazilas$ = this.optionsService.getUpazilas(districtId);
  }

  loadVillages() {
    const { upazilaId } = this.personForm.value;
    this.personForm.controls['villageId'].reset();
    this.villages$ = this.optionsService.getVillages(upazilaId);
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
      religion: [null],
      gender: [null, [Validators.required]],
      occupation: [null, Validators.required],
      age: ['',Validators.maxLength(3)],
      nId: [''],
      postalCode: [''],
      districtId: [null, Validators.required],
      upazilaId: [null, Validators.required],
      villageId:[null, Validators.required]
    });
  }
}
