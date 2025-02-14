import { bloodGroups } from './../../constants/blood-groups';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { PersonCreateRequestModel, PersonUpdateRequestModel } from '../../types/person.model';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { OccupationService } from '../../services/occupation.service';
import { OptionsService } from 'src/app/shared/services/options.service';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
    standalone: false
})
export class PersonComponent implements OnInit {
  personForm: FormGroup;
  isEditMode = false;
  religions$: Observable<OptionsModel[]> = this.optionsService.getReligions();
  degrees$: Observable<OptionsModel[]> = this.optionsService.getDegrees();
  villages$: Observable<OptionsModel[]>;
  occupations$: Observable<OptionsModel[]>;
  bloodGroups = bloodGroups;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router,
    public occupationService: OccupationService,
    private optionsService: OptionsService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    this.loadPerson();
    this.loadOccupation();
  }

  private loadPerson() {
    this.subscription = this.activatedRoute.params.pipe(map(params => params['id']), filter(id => id !== undefined),
  switchMap((id:string) => this.personService.getPersons(id))).subscribe({
    next: person => {
      const { occupationId, occupationName, districtName, upazilaName, villageName, degreeName, ...restValue } = person;
        this.personForm.setValue({ ...restValue, occupation: occupationId });
        this.isEditMode = true;
    },
    error: (error) => this.notificationService.error(NotificationMessage.ServerError),
  });
  }

  onPersonAdd() {
    const { gender, occupation, religion, ...restValue } = this.personForm.value;
    const requestModel: PersonCreateRequestModel = { ...restValue, gender: +gender, occupationId: +occupation, religion: +religion };

    this.personService.savePersons(requestModel).subscribe(value => {
      this.personForm.reset();
      this.router.navigate(['/personnel/persons']);
    });
  }

  onPersonUpdate() {
    const { gender, occupation, religion, ...restValue } = this.personForm.value;
    const requestModel: PersonUpdateRequestModel = { ...restValue, gender: +gender, occupationId: +occupation, religion: +religion };

    this.personService.updatePersons(requestModel).subscribe(value => {
      this.personForm.reset();
      this.router.navigate(['/personnel/persons']);
    });
  }

  resetForm() {
    this.personForm.reset();
  }

  loadOccupation() {
    this.occupations$ = this.occupationService.getOccupationsOption();
  }

  createForm() {
    this.personForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      nickName: ['', Validators.maxLength(50)],
      fatherName: [''],
      motherName: [''],
      spouseName: [''],
      phone: ['', [Validators.required]],
      alternativeContact: [''],
      address: ['', [Validators.required]],
      email: ['', Validators.email],
      religion: [null, Validators.required],
      gender: [null, [Validators.required]],
      occupation: [null, Validators.required],
      bloodGroup: ['', Validators.maxLength(3)],
      nId: [''],
      dateOfBirth: [null],
      postalCode: [''],
      degreeId: [null],
      citizenshipType: [null],
      birthCountry: [null],
    });
  }
}
