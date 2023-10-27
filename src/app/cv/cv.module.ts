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
import { SubjectComponent } from './pages/subject/subject.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { SubjectService } from './services/subject.service';
import { ProfessionalComponent } from './pages/professional/professional.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';
import { MatrimonialsComponent } from './pages/matrimonials/matrimonials.component';
import { MatrimonialComponent } from './pages/matrimonial/matrimonial.component';
import { ProfessionalBasicComponent } from './components/professional-basic/professional-basic.component';
import { MatrimonialBasicComponent } from './components/matrimonial-basic/matrimonial-basic.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PersonService } from '../personnel/services/person.service';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { TrainingComponent } from './components/training/training.component';
import { JobReferenceComponent } from './components/job-reference/job-reference.component';
import { CvOptionsService } from './services/cv-options.service';
import { EducationService } from './services/education.service';


@NgModule({
  declarations: [LayoutComponent, DegreeComponent, DegreesComponent, DesignationComponent, DesignationsComponent, SubjectComponent, SubjectsComponent, ProfessionalComponent, ProfessionalsComponent, MatrimonialsComponent, MatrimonialComponent, ProfessionalBasicComponent, MatrimonialBasicComponent, EducationComponent, ExperienceComponent, TrainingComponent, JobReferenceComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [DegreeService, DesignationService, SubjectService, PersonService, CvOptionsService, EducationService]
})
export class CvModule { }
