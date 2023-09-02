import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonClientService } from '../../services/person-client.service';
import { PersonCreateRequestModel, PersonUpdateRequestModel } from '../../types/person.model';
import { PersonDataService } from '../../services/person-data.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit{
  personForm: FormGroup;
  isEditMode = false;

  constructor(private formBuilder: FormBuilder, private personService: PersonClientService, public dataService: PersonDataService) {
    this.createForm();
  }
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

  createForm() {
    this.personForm = this.formBuilder.group({
      id: [''],
      name: ['',[Validators.required]],
      fatherName: [''],
      motherName: [''],
      spouseName: [''],
      phone: ['', [Validators.required]],
      alternativeContact: [''],
      address: ['',[Validators.required]],
      email: ['', Validators.email],
      religion: [null],
      gender: [null, [Validators.required]],
      nId: [''],
      postalCode: [''],
    });
  }
}
