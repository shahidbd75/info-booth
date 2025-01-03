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
import { HospitalsComponent } from './pages/hospitals/hospitals.component';
import { HospitalComponent } from './pages/hospital/hospital.component';
import { VillageModule } from '../shared/modules/village-select/village.module';
import { AmenitiesComponent } from './pages/amenities/amenities.component';
import { AmenityComponent } from './pages/amenity/amenity.component';
import { HealthAmenitiesService } from './services/health-amenities.service';
import { DoctorChambersComponent } from './pages/doctor-chambers/doctor-chambers.component';
import { DoctorChambersClientService } from './services/doctor-chambers-client.service';
import { DoctorChamberComponent } from './pages/doctor-chamber/doctor-chamber.component';
import { LocationSelectorComponent } from "../shared/components/location-selector/location-selector.component";


@NgModule({
  declarations: [HealthComponent, SpecializationsComponent,SpecializationComponent, DoctorsComponent, 
    DoctorComponent, HospitalsComponent, HospitalComponent, AmenitiesComponent, AmenityComponent, DoctorChambersComponent, DoctorChamberComponent],
  imports: [
    CommonModule,
    HealthRoutingModule,
    MaterialModule,
    RouterModule, MaterialModule, FormsModule, SharedModule, ReactiveFormsModule, NgSelectModule, VillageModule,
    LocationSelectorComponent
],
  providers: [SpecializationClientService, {provide:BaseHttpService, useClass: SpecializationClientService}, DoctorsClientService, PersonService, HealthOptionsService, HealthAmenitiesService, DoctorChambersClientService]
})
export class HealthModule { }
