import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { PersonComponent } from './pages/person/person.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { OccupationsComponent } from './pages/occupations/occupations.component';
import { OccupationComponent } from './pages/occupation/occupation.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'persons', component: PersonsComponent},
    { path: 'person', component: PersonComponent},
    { path: 'occupations', component: OccupationsComponent},
    { path: 'occupation/:id', component: OccupationComponent},
    { path: 'occupation', component: OccupationComponent},    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
