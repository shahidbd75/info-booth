import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionsService } from '../../services/options.service';
import { Observable, delay } from 'rxjs';
import { OptionsModel } from '../../models/options-model';

@Component({
  selector: 'app-village-select',
  templateUrl: './village-select.component.html',
  styleUrls: ['./village-select.component.scss'],
})
export class VillageSelectComponent implements OnInit, OnChanges {
  public formGroup: FormGroup;
  @Input({ required: true }) districtId: number;
  @Input({ required: true }) upazilaId: number;
  @Input({ required: true }) villageId: string;
  @Input() reset = false;
  @Output() villageChanges = new EventEmitter<string>();
  districts$: Observable<OptionsModel[]> = this.optionService.getDistricts().pipe(delay(4));
  upazilas$: Observable<OptionsModel[]>;
  villages$: Observable<OptionsModel[]>;

  constructor(
    private fb: FormBuilder,
    private optionService: OptionsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.reset) {
      this.formGroup.reset();
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      district: [this.districtId, [Validators.required]],
      upazila: [this.upazilaId, [Validators.required]],
      village: [this.villageId, [Validators.required]],
    });

    this.loadData();

    if (this.formGroup.dirty || this.formGroup.pristine) {
      this.reset = false;
    }
  }

  onVillageChange() {
    const { village } = this.formGroup.value;
    this.villageChanges.emit(village);
  }

  loadData() {
    if (this.districtId) {
      this.formGroup.patchValue({
        district: this.districtId,
      });
      this.loadUpazilas();
      if (this.upazilaId) {
        this.formGroup.patchValue({
          upazila: this.upazilaId,
        });
        this.loadVillages();
        if (this.villageId) {
          this.formGroup.patchValue({
            village: this.villageId,
          });
        }
      }
    }
  }

  loadUpazilas() {
    const { district } = this.formGroup.value;

    this.formGroup.controls['upazila'].reset();
    this.upazilas$ = this.optionService.getUpazilas(district).pipe(delay(5));
  }

  loadVillages() {
    const { upazila } = this.formGroup.value;
    this.formGroup.controls['village'].reset();
    this.villages$ = this.optionService.getVillages(upazila);
  }
}
