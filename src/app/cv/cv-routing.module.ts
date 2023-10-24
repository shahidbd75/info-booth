import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DegreesComponent } from './pages/degrees/degrees.component';
import { DegreeComponent } from './pages/degree/degree.component';
import { DesignationsComponent } from './pages/designations/designations.component';
import { DesignationComponent } from './pages/designation/designation.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { SubjectComponent } from './pages/subject/subject.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'degrees', component: DegreesComponent },
    { path: 'degree/:id', component: DegreeComponent },
    { path: 'degree', component: DegreeComponent },
    { path: 'designations', component: DesignationsComponent },
    { path: 'designation/:id', component: DesignationComponent },
    { path: 'designation', component: DesignationComponent },
    { path: 'subjects', component: SubjectsComponent },
    { path: 'subject/:id', component: SubjectComponent },
    { path: 'subject', component: SubjectComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
