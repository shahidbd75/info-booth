import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { DegreeComponent } from './pages/degree/degree.component';
import { DegreesComponent } from './pages/degrees/degrees.component';
import { MaterialModule } from '../lib/material/material.module';


@NgModule({
  declarations: [LayoutComponent, DegreeComponent, DegreesComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    MaterialModule,
  ]
})
export class CvModule { }
