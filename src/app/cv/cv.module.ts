import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { DegreeComponent } from './pages/degree/degree.component';
import { DegreesComponent } from './pages/degrees/degrees.component';
import { MaterialModule } from '../lib/material/material.module';
import { DegreeService } from './services/degree.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DesignationComponent } from './pages/designation/designation.component';
import { DesignationsComponent } from './pages/designations/designations.component';
import { DesignationService } from './services/designation.service';


@NgModule({
  declarations: [LayoutComponent, DegreeComponent, DegreesComponent, DesignationComponent, DesignationsComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DegreeService, DesignationService]
})
export class CvModule { }
