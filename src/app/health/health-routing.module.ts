import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthRoutePath } from './constant/health-route-path';
import { HealthComponent } from './health.component';

const routes: Routes = [{path:HealthRoutePath.Root, component: HealthComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRoutingModule { }
