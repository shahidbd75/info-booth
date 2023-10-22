import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../lib/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { LanguageComponent } from './pages/language/language.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import { LanguageService } from './services/language.service';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [LayoutComponent, LanguageComponent, LanguagesComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [
    LanguageService
  ]
})
export class SettingsModule { }
