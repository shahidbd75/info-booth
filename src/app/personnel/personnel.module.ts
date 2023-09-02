import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonComponent } from './pages/person/person.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { MaterialModule } from '../lib/material/material.module';
import { PersonClientService } from './services/person-client.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonDataService } from './services/person-data.service';


@NgModule({
  declarations: [
    PersonComponent,
    LayoutComponent,
    PersonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PersonnelRoutingModule,
    MaterialModule,
    RouterModule
  ],
  providers: [PersonClientService, PersonDataService]
})
export class PersonnelModule { }
