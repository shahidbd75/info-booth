import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserRegistrationComponent },
    { path: 'user', component: UserRegistrationComponent },
    { path: '', redirectTo: 'users', pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
