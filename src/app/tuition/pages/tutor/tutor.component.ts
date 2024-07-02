import { OptionsModel } from 'src/app/shared/models/options-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TutorService } from '../../services/tutor.service';
import { Router } from '@angular/router';
import { TutorCreateRequestModel, TutorUpdateRequestModel } from '../../types/tutor.model';
import { PersonService } from 'src/app/personnel/services/person.service';
import { CvOptionsService } from 'src/app/cv/services/cv-options.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss'],
})
export class TutorComponent implements OnInit {
  tutorForm: FormGroup;
  isEditMode = false;
  degrees$: Observable<OptionsModel[]> = this.cvOptionsService.getDegrees();
  subjects$: Observable<OptionsModel[]> = this.cvOptionsService.getSubjects();
  persons$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  private tutorsRouterUrl = '/tuition/tutors';

  constructor(
    private formBuilder: FormBuilder,
    private tutorService: TutorService,
    private router: Router,
    private personService: PersonService,
    private cvOptionsService: CvOptionsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadPersons();
    this.loadTutor();
  }

  private loadTutor() {
    if (this.tutorService.selectedTutor) {
      const { subjectName, degreeName, tutorName, ...tutor } = this.tutorService.selectedTutor;

      this.tutorForm.setValue({ ...tutor });
      this.isEditMode = true;

      this.tutorService.selectedTutor = null;
    }
  }

  onTutorAdd() {
    const { ...restValue } = this.tutorForm.value;
    const requestModel: TutorCreateRequestModel = { ...restValue };

    this.tutorService.saveTutor(requestModel).subscribe(value => {
      this.tutorForm.reset();
      this.router.navigate([this.tutorsRouterUrl]);
    });
  }

  onTutorUpdate() {
    const { ...restValue } = this.tutorForm.value;
    const requestModel: TutorUpdateRequestModel = { ...restValue };

    this.tutorService.updateTutor(requestModel).subscribe(value => {
      this.tutorForm.reset();
      this.router.navigate([this.tutorsRouterUrl]);
    });
  }

  loadPersons() {
    this.persons$ = this.personService.getPersonOptions();
  }

  resetForm() {
    this.tutorForm.reset();
  }

  createForm() {
    this.tutorForm = this.formBuilder.group({
      id: [''],
      experience: [''],
      subjectId: [null],
      institute: [''],
      degreeId: [null],
    });
  }
}
