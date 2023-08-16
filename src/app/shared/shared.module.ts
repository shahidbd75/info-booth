import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotAuthorizeComponent } from './components/not-authorize/not-authorize.component';
import { MaterialModule } from '../lib/material/material.module';



@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    PageNotFoundComponent,
    NotAuthorizeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }
