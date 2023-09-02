import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NotAuthorizeComponent } from './shared/components/not-authorize/not-authorize.component';
import {DashboardComponent} from "./shared/components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children: [
    {path: 'buy-sell', loadChildren: () => import('./sell-buy/sell-buy.module').then(m=>m.SellBuyModule)},
    {path: 'personnel', loadChildren: () => import('./personnel/personnel.module').then(m=>m.PersonnelModule)},
    {path: '', component: DashboardComponent}
  ]},
  {path: 'not-authorize', component: NotAuthorizeComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
