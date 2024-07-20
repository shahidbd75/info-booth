import { PersonService } from './../../../personnel/services/person.service';
import { OptionsModel } from './../../../shared/models/options-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TuitionPostService } from '../../services/tuition-post.service';
import { TuitionPostCreateRequestModel, TuitionPostUpdateRequestModel } from '../../types/tuition-post';
import { TutorService } from '../../services/tutor.service';

@Component({
  selector: 'app-tution-post',
  templateUrl: './tution-post.component.html',
  styleUrls: ['./tution-post.component.scss'],
})
export class TutionPostComponent implements OnInit {
  tuitionPostForm: FormGroup;
  isEditMode = false;
  tutors$: Observable<OptionsModel[]> = this.tutorService.getTutorOptions();
  // medium$: Observable<OptionsModel[]> = this.cvOptionsService.getSubjects();
  // method$: Observable<OptionsModel[]> = this.personService.getPersonOptions();
  private tuitionPostsRouterUrl = '/tuition/posts';

  constructor(
    private formBuilder: FormBuilder,
    private tuitionPostService: TuitionPostService,
    private tutorService: TutorService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadTutors();
    this.loadPost();
  }

  private loadPost() {
    if (this.tuitionPostService.selectedTuition) {
      const tuitionPost = this.tuitionPostService.selectedTuition;

      this.tuitionPostForm.setValue({ ...tuitionPost });
      this.isEditMode = true;

      this.tuitionPostService.selectedTuition = null;
    }
  }

  onTutorAdd() {
    const { ...restValue } = this.tuitionPostForm.value;
    const requestModel: TuitionPostCreateRequestModel = { ...restValue };

    this.tuitionPostService.saveTuitionPost(requestModel).subscribe(value => {
      this.tuitionPostForm.reset();
      this.router.navigate([this.tuitionPostsRouterUrl]);
    });
  }

  onTutorUpdate() {
    const { ...restValue } = this.tuitionPostForm.value;
    const requestModel: TuitionPostUpdateRequestModel = { ...restValue };

    this.tuitionPostService.updateTuitionPost(requestModel).subscribe(value => {
      this.tuitionPostForm.reset();
      this.router.navigate([this.tuitionPostsRouterUrl]);
    });
  }

  loadTutors() {
    //this.tutors$ = this.personService.getPersonOptions();
  }

  resetForm() {
    this.tuitionPostForm.reset();
  }

  createForm() {
    this.tuitionPostForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
      salary: [null, [Validators.required]],
      isNegotiable: [false, [Validators.required]],
      medium: [null, [Validators.maxLength(100)]],
      availability: [null, [Validators.maxLength(100)]],
      validityInDays: [null, [Validators.required]],
      preferableGender: [null],
      address: ['', [Validators.maxLength(200)]],
      teachingMethod: [null, [Validators.maxLength(150)]],
      timeSlot: [null, [Validators.maxLength(150)]],
      tutorId: [null, [Validators.required]],
    });
  }
}
