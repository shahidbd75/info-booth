import { Component, inject, OnDestroy, OnInit, } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { OptionsService } from '../../services/options.service';
import { GenericOptionsModel, OptionsModel } from '../../models/options-model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-location-selector',
    imports: [ReactiveFormsModule, NgSelectModule, AsyncPipe],
    templateUrl: './location-selector.component.html',
    styleUrl: './location-selector.component.scss',
    providers: [OptionsService],
    viewProviders: [{ provide: ControlContainer, useFactory: () => inject(ControlContainer, { skipSelf: true }) }]
})
export class LocationSelectorComponent implements OnInit, OnDestroy {
  private optionService = inject(OptionsService);
  parentContainer = inject(ControlContainer);

  districtId = new FormControl(null);
  upazilaId = new FormControl(null);
  villageId = new FormControl(null, [Validators.required]);

  get parentFormgroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  districts$: Observable<OptionsModel[]> = this.optionService.getDistricts();
  upazilas$: Observable<OptionsModel[]>;
  villages$: Observable<OptionsModel[]>;

  ngOnInit(): void {
    this.parentFormgroup.addControl('districtId', this.districtId);
    this.parentFormgroup.addControl('upazilaId', this.upazilaId);
    this.parentFormgroup.addControl('villageId', this.villageId);

    this.setControlsValue();
  }
  ngOnDestroy(): void {
    this.parentFormgroup.removeControl('districtId');
    this.parentFormgroup.removeControl('upazilaId');
    this.parentFormgroup.removeControl('villageId');
  }

  loadUpazilas(param: GenericOptionsModel<number>): void {
    const districtId: number = param.id;
    if (districtId) {
      this.upazilas$ = this.optionService.getUpazilas(districtId);
    }
  }

  loadVillages(param: GenericOptionsModel<number>): void {
    const upazilaId: number = param.id;
    if (upazilaId) {
      this.villages$ = this.optionService.getVillages(upazilaId);
    }
  }

  private setControlsValue() {
    this.parentFormgroup.valueChanges.subscribe((values) => {
      if (values.districtId) {
        this.parentFormgroup.controls['districtId'].setValue(values.districtId, { emitEvent: false });
        this.loadUpazilas({ id: values.districtId, name: '' });
      }
      if (values.upazilaId) {
        this.parentFormgroup.controls['upazilaId'].setValue(values.upazilaId, { emitEvent: false });
        this.loadVillages({ id: values.upazilaId, name: '' });
      }
      if (values.villageId) {
        this.parentFormgroup.controls['villageId'].setValue(values.villageId, { emitEvent: false });
      }
    })
  }
}
