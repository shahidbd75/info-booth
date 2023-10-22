import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerComponent } from './pages/worker/worker.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../lib/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { WorkerService } from './services/worker.service';
import { WorkersComponent } from './pages/workers/workers.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PersonService } from '../personnel/services/person.service';
import { GlobalDataContextService } from '../shared/services/global-data-context.service';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'workers', component: WorkersComponent },
    { path: 'worker/:id', component: WorkerComponent },
    { path: 'worker', component: WorkerComponent },
    { path: '', redirectTo: 'worder', pathMatch: "full"}
  ]}
];

@NgModule({
  declarations: [
    WorkerComponent,
    LayoutComponent,
    WorkersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgSelectModule
  ],
  providers: [WorkerService, PersonService]
})
export class WorkerModule { }
