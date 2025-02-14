import { OptionsService } from 'src/app/shared/services/options.service';
import { GenericOptionsModel, OptionsModel } from './../../../shared/models/options-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TuitionPostService } from '../../services/tuition-post.service';
import { TuitionPostCreateRequestModel, TuitionPostUpdateRequestModel, TutionPostResponseModel } from '../../types/tuition-post';
import { TutorService } from '../../services/tutor.service';

@Component({
    selector: 'app-tution-post',
    templateUrl: './tution-post.component.html',
    styleUrls: ['./tution-post.component.scss'],
    standalone: false
})
export class TutionPostComponent implements OnInit {
  tuitionPostForm: FormGroup;
  isEditMode = false;
  tutors$: Observable<OptionsModel[]> = this.tutorService.getTutorOptions();
  medium$: Observable<OptionsModel[]> = this.tuitionPostService.getTuitionMedium();
  method$: Observable<OptionsModel[]> = this.tuitionPostService.getTuitionMethod();
  genders$: Observable<OptionsModel[]> = this.optionsService.getGenders();
  weekDays$: Observable<OptionsModel[]> = this.optionsService.getWeekDays();
  districts$: Observable<OptionsModel[]> = this.optionsService.getDistricts();
  areas$: Observable<OptionsModel[]>;
  private tuitionPostsRouterUrl = '/tuition/posts';

  constructor(
    private formBuilder: FormBuilder,
    private tuitionPostService: TuitionPostService,
    private tutorService: TutorService,
    private optionsService: OptionsService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadPost();
  }

  private loadPost() {
    if (this.tuitionPostService.selectedTuition) {
      const tuitionPost = this.tuitionPostService.selectedTuition;

      console.log(tuitionPost);

      this.updateFormData(tuitionPost);
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

  resetForm() {
    this.tuitionPostForm.reset();
  }

  createForm() {
    this.tuitionPostForm = this.formBuilder.group({
      id: [null],
      title: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
      salary: [null, [Validators.required]],
      isNegotiable: [false, [Validators.required]],
      medium: [null, [Validators.maxLength(100)]],
      availability: [null, [Validators.maxLength(200)]],
      validityInDays: [null, [Validators.required]],
      preferableGender: [null],
      address: ['', [Validators.maxLength(200)]],
      teachingMethod: [null, [Validators.maxLength(150)]],
      timeSlot: [null, [Validators.maxLength(150)]],
      tutorId: [null, [Validators.required]],
      preferredAreas: [null],
      district: [null],
    });
  }

  loadAreas(district: GenericOptionsModel<number>) {
    this.areas$ = this.optionsService.getVillagesByDistrict(district.id);
  }

  private updateFormData(model: TutionPostResponseModel) {
    this.tuitionPostForm.setValue({
      id: model.id,
      title: model.title,
      description: model.description,
      salary: model.salary,
      isNegotiable: model.isNegotiable,
      medium: model.medium,
      availability: model.availability,
      validityInDays: model.validityInDays,
      preferableGender: model.preferableGender,
      address: model.address,
      teachingMethod: model.teachingMethod,
      timeSlot: model.timeSlot,
      tutorId: model.tutorId,
      preferredAreas: model.preferredAreas,
      district: model.district,
    });
  }
}
