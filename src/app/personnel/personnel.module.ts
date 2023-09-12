import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonComponent } from './pages/person/person.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { MaterialModule } from '../lib/material/material.module';
import { PersonService } from './services/person.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OccupationsComponent } from './pages/occupations/occupations.component';
import { OccupationComponent } from './pages/occupation/occupation.component';
import { OccupationService } from './services/occupation.service';
import { VillageModule } from '../shared/modules/village-select/village.module';


@NgModule({
  declarations: [
    PersonComponent,
    LayoutComponent,
    PersonsComponent,
    OccupationsComponent,
    OccupationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PersonnelRoutingModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    VillageModule,
  ],
  providers: [PersonService,OccupationService]
})
export class PersonnelModule { }
