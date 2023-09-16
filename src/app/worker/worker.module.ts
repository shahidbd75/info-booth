import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerComponent } from './worker/worker.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../lib/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { WorkerService } from './services/worker.service';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'worker', component: WorkerComponent },
    { path: '', redirectTo: 'worder', pathMatch: "full"}
  ]}
];

@NgModule({
  declarations: [
    WorkerComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [WorkerService]
})
export class WorkerModule { }
