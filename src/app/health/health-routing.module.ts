import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthRoutePath } from './constant/health-route-path';
import { HealthComponent } from './health.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { SpecializationsComponent } from './pages/specializations/specializations.component';
import { SpecializationComponent } from './pages/specialization/specialization.component';
import { HospitalComponent } from './pages/hospital/hospital.component';

const routes: Routes = [
  { path:HealthRoutePath.Root, component: HealthComponent,
  children: [
    { path:HealthRoutePath.Specializations, component: SpecializationsComponent},
    { path:`${HealthRoutePath.Specialization}/:id`, component: SpecializationComponent},
    { path:HealthRoutePath.Specialization, component: SpecializationComponent},
    { path:HealthRoutePath.Doctors, component: DoctorsComponent},
    { path:`${HealthRoutePath.Doctor}/:id`, component: DoctorComponent},
    { path:HealthRoutePath.Doctor, component: DoctorComponent},
    { path:HealthRoutePath.Hospitals, component: HospitalComponent},
    { path:`${HealthRoutePath.Hospital}/:id`, component: HospitalComponent},
    { path:HealthRoutePath.Hospital, component: HospitalComponent},
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRoutingModule { }
