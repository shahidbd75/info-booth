import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NotAuthorizeComponent } from './shared/components/not-authorize/not-authorize.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoginComponent } from './core/components/login/login.component';
import { authGuard } from './shared/guards/auth.guard';
import { RoutePath } from './shared/constants/route-path';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: RoutePath.BUY_SELL, loadChildren: () => import('./sell-buy/sell-buy.module').then(m => m.SellBuyModule) },
      { path: RoutePath.PERSONNEL, loadChildren: () => import('./personnel/personnel.module').then(m => m.PersonnelModule) },
      { path: RoutePath.LOCATION, loadChildren: () => import('./location/location.module').then(m => m.LocationModule) },
      { path: RoutePath.WORKER, loadChildren: () => import('./worker/worker.module').then(m => m.WorkerModule) },
      { path: RoutePath.TOLET, loadChildren: () => import('./tolet/tolet.module').then(m => m.ToletModule) },
      { path: RoutePath.BOOK, loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
      { path: RoutePath.SETTINGS, loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: RoutePath.CV, loadChildren: () => import('./cv/cv.module').then(m => m.CvModule) },
      { path: RoutePath.USER, loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
      { path: RoutePath.TUITION, loadChildren: () => import('./tuition/tuition.module').then(m => m.TuitionModule) },
      { path: RoutePath.HEALTH, loadChildren: () => import('./health/health.module').then(m => m.HealthModule) },
      { path: RoutePath.DASHBOARD, component: DashboardComponent, canActivate: [authGuard] },
      { path: '', redirectTo: RoutePath.DASHBOARD, pathMatch: 'full' },
    ],
  },
  { path: RoutePath.NOT_AUTHORIZE, component: NotAuthorizeComponent },
  { path: RoutePath.LOGIN, component: LoginComponent },
  { path: RoutePath.PAGE_NOT_FOUND, component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
