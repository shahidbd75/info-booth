import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VillageSelectComponent } from './village-select/village-select.component';
import { SharedModule } from '../shared.module';
import { OccupationService } from 'src/app/personnel/services/occupation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [VillageSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[OccupationService],
  exports: [VillageSelectComponent]
})
export class VillageModule { }
