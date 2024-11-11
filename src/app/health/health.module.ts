import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';
import { HealthComponent } from './health.component';
import { SpecializationClientService } from './services/specialization-client.service';
import { BaseHttpService } from '../shared/services/base.service';
import { MaterialModule } from '../lib/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { SpecializationsComponent } from './pages/specializations/specializations.component';
import { SpecializationComponent } from './pages/specialization/specialization.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { DoctorsClientService } from './services/doctors-client.service';
import { PersonService } from '../personnel/services/person.service';
import { HealthOptionsService } from './services/health-options.service';


@NgModule({
  declarations: [HealthComponent, SpecializationsComponent,SpecializationComponent, DoctorsComponent, DoctorComponent,],
  imports: [
    CommonModule,
    HealthRoutingModule,
    MaterialModule,
    RouterModule, MaterialModule, FormsModule, SharedModule, ReactiveFormsModule, NgSelectModule,],
  providers: [SpecializationClientService, {provide:BaseHttpService, useClass: SpecializationClientService}, DoctorsClientService, PersonService, HealthOptionsService]
})
export class HealthModule { }
