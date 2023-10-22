import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageComponent } from './pages/language/language.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LanguagesComponent } from './pages/languages/languages.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: 'languages', component: LanguagesComponent},
      {path: 'language/:id', component: LanguageComponent},
      {path: 'language', component: LanguageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
