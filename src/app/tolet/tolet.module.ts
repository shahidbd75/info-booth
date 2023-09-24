import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToletRoutingModule } from './tolet-routing.module';
import { ToletsComponent } from './pages/tolets/tolets.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ToletComponent } from './pages/tolet/tolet.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../lib/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PersonService } from '../personnel/services/person.service';


@NgModule({
  declarations: [
    ToletsComponent,
    LayoutComponent,
    ToletComponent
  ],
  imports: [
    CommonModule,
    ToletRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
  ],
  providers: [PersonService]
})
export class ToletModule { }
