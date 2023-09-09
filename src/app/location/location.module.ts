import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VillagesComponent } from './pages/villages/villages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../lib/material/material.module';
import { VillageComponent } from './pages/village/village.component';



@NgModule({
  declarations: [
    VillagesComponent,
    VillageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class LocationModule { }
