import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DegreesComponent } from './pages/degrees/degrees.component';
import { DegreeComponent } from './pages/degree/degree.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'degrees', component: DegreesComponent },
    { path: 'degree/:id', component: DegreeComponent },
    { path: 'degree', component: DegreeComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
