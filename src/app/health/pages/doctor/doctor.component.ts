import { OptionsModel } from './../../../shared/models/options-model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DoctorsClientService } from '../../services/doctors-client.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DoctorsCreateRequestModel, DoctorsResponseModel, DoctorsUpdateRequestModel } from '../../types/doctors-types';
import { PersonService } from 'src/app/personnel/services/person.service';
import { HealthOptionsService } from '../../services/health-options.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
  isEditMode = false;
  formGroup: FormGroup;
  subscription: Subscription = new Subscription();
  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  specializations$: Observable<OptionsModel[]> = this.optionService.getSpecializations();
  types$: Observable<OptionsModel[]> = this.optionService.getDoctorTypes();
  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorsClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private optionService: HealthOptionsService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null],
      bmdcRegNo: ['', [Validators.required]],
      banglaName: ['', ],
      degrees: [''],
      specializations: [null, [Validators.required]],
      currentInstitute: [''],
      facebookLink: [''],
      linkedInLink: [''],
      youtubeLink: [''],
      details: [''],
      nationality: [''],
      doctorsType: [null, [Validators.required]]
    });

    this.loadData();
  }

  onSave() {
    const requestModel: DoctorsCreateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.doctorService.save(requestModel).subscribe(
        () => {
          this.router.navigate(['health/specializations']);
        },
        () => console.log('Not saved')
      )
    );
  }

  onUpdate() {
    const requestModel: DoctorsUpdateRequestModel = this.formGroup.value;

    this.subscription.add(
      this.doctorService.update(requestModel).subscribe(
        {
          next:() => {
            this.router.navigate(['health/specializations']);
          },
          error:() => console.log('Not updated')
        }
      )
    );
  }

  resetForm() {
    if (this.isEditMode) {
      this.router.navigate(['health/specializations']);
    } else {
      this.formGroup.reset();
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.subscription.add(
          this.doctorService.getById<DoctorsResponseModel>(id).subscribe((data: DoctorsResponseModel) => {
            const { createdDate, isActive, ...restValue } = data;
            this.formGroup.setValue({
              ...restValue,
            });
          })
        );

        this.isEditMode = true;
      }
    });
  }
}
