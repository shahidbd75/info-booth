import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionsService } from '../../services/options.service';
import { Observable } from 'rxjs';
import { OptionsModel } from '../../models/options-model';

@Component({
  selector: 'app-village-select',
  templateUrl: './village-select.component.html',
  styleUrls: ['./village-select.component.scss'],
})
export class VillageSelectComponent implements OnInit, OnChanges {
  public formGroup: FormGroup;
  districts$: Observable<OptionsModel[]> = this.optionService.getDistricts();
  upazilas$: Observable<OptionsModel[]>;
  villages$: Observable<OptionsModel[]>;
  @Input() districtId?: number;
  @Input() upazilaId: string;
  @Input() villageId: string;
  @Input() reset = false;
  @Output() villageChanges = new EventEmitter<string>();
  constructor(private fb: FormBuilder, private optionService: OptionsService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.reset);
    if(this.reset) {
      this.formGroup.reset();
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      district: [this.districtId, [Validators.required]],
      upazila: [null, [Validators.required]],
      village: [null, [Validators.required]]
    });

    this.loadData();

    if(this.formGroup.dirty || this.formGroup.pristine) {
      this.reset = false;
    }
  }

  onVillageChange() {
    const {village} =this.formGroup.value;
    this.villageChanges.emit(village);
  }

  loadData() {
    if(this.districtId) {
      this.formGroup.patchValue({
        district: this.districtId
      });
      this.loadUpazilas();
      if(this.upazilaId) {
        this.formGroup.patchValue({
          upazila: this.districtId
        });
        this.loadVillages();
        if(this.villageId) {
          this.formGroup.patchValue({
            village: this.districtId
          });
        }
      }
    }
  }

  loadUpazilas() {
    const {district} = this.formGroup.value;

    this.upazilas$ = this.optionService.getUpazilas(district);
  }

  loadVillages() {
    const {upazila} = this.formGroup.value;

    this.villages$ = this.optionService.getVillages(upazila);
  }
}
