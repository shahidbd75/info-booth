import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumTableCreateModel, EnumTableResponseModel, EnumTableUpdateModel } from 'src/app/shared/models/enum-table-model';
import { OccupationService } from '../../services/occupation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss'],
})
export class OccupationComponent implements OnInit {
  occupationForm: FormGroup;
  isEditMode = false;
  subscription$: Subscription;
  constructor(
    private fb: FormBuilder,
    private occupationService: OccupationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.subscription$ = this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.occupationService.getOccupation(+id).subscribe((occupation: EnumTableResponseModel) => {
          this.occupationForm.setValue(occupation);
        });
      }
    });
  }

  initializeForm() {
    this.occupationForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      banglaName: [''],
    });
  }

  onOccupationAdd() {
    const { name, banglaName }: EnumTableCreateModel = this.occupationForm.value;

    this.occupationService.saveOccupation({ name, banglaName }).subscribe(() => {
      this.router.navigate(['personnel/occupations']);
      this.resetSelected();
    });
  }

  onOccupationUpdate() {
    const { id, name, banglaName }: EnumTableUpdateModel = this.occupationForm.value;

    this.occupationService.updateOccupation({ id: +id, name, banglaName }).subscribe(() => {
      this.router.navigate(['personnel/occupations']);
      this.resetSelected();
    });
  }

  private resetSelected() {
    this.occupationForm.reset();
  }
}
