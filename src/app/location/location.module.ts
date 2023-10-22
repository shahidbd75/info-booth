import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VillagesComponent } from './pages/villages/villages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../lib/material/material.module';
import { VillageComponent } from './pages/village/village.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { VillageService } from './services/village.service';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    VillagesComponent,
    VillageComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgSelectModule,
    RouterModule.forChild([
      {
        path:'', component: LayoutComponent,
        children: [
          {path: 'villages', component: VillagesComponent},
          {path: 'village/:id', component: VillageComponent},
          {path: 'village', component: VillageComponent}
        ]
      }
    ])
  ], providers: [VillageService]
})
export class LocationModule { }
