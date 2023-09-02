import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { PersonComponent } from './pages/person/person.component';
import { PersonsComponent } from './pages/persons/persons.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'persons', component: PersonsComponent},
    { path: 'person', component: PersonComponent},
    { path: 'person/:id', component: PersonComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
