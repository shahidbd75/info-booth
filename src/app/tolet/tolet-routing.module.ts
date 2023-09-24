import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ToletsComponent } from './pages/tolets/tolets.component';
import { ToletComponent } from './pages/tolet/tolet.component';

const routes: Routes = [
  { 
    path: '', component: LayoutComponent, children: [
      { path: 'to-lets', component: ToletsComponent },
      { path: 'to-let/:id', component: ToletComponent },
      { path: 'to-let', component: ToletComponent }
   ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToletRoutingModule { }
