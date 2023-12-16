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
import { ProfessionalBasicService } from './services/professional-basic.service';
import { MatrimonialBasicCvService } from './services/matrimonial-basic.service';
import { ExperienceService } from './services/experience.service';
import { CvEnumOptionsService } from './services/cv-enum-options.service';
import { TrainingService } from './services/training.service';
import { JobReferenceService } from './services/job-reference.service';
import { FamilyMemberComponent } from './components/family-member/family-member.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PreferableComponent } from './components/preferable/preferable.component';
import { PreferableOccupationComponent } from './components/preferable-occupation/preferable-occupation.component';
import { OccupationService } from '../personnel/services/occupation.service';
import { FamilyMerberService } from './services/family-merber.service';
import { FavoriteService } from './services/favorite.service';
import { PreferableService } from './services/preferable.service';
import { PreferableOccupationService } from './services/preferable-occupation.service';
import { ReligionInfoComponent } from './components/religion-info/religion-info.component';


@NgModule({
  declarations: [LayoutComponent, DegreeComponent, DegreesComponent, DesignationComponent, DesignationsComponent, SubjectComponent, SubjectsComponent, ProfessionalComponent, ProfessionalsComponent, MatrimonialsComponent, MatrimonialComponent, ProfessionalBasicComponent, MatrimonialBasicComponent, EducationComponent, ExperienceComponent, TrainingComponent, JobReferenceComponent, FamilyMemberComponent, FavoriteComponent, PreferableComponent, PreferableOccupationComponent, ReligionInfoComponent,],
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
  providers: [DegreeService, 
    DesignationService, 
    SubjectService, 
    PersonService, 
    CvOptionsService, 
    EducationService, 
    ProfessionalBasicService,
    ExperienceService,
    CvEnumOptionsService,
    TrainingService,
    JobReferenceService,
    MatrimonialBasicCvService,
    OccupationService,
    FamilyMerberService,
    FavoriteService,
    PreferableService,
    PreferableOccupationService]
})
export class CvModule { }
