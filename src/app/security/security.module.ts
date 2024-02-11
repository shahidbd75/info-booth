import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../lib/material/material.module';
import { UsersComponent } from './components/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [UserRegistrationComponent, UsersComponent, LayoutComponent],

  imports: [CommonModule, SecurityRoutingModule, ReactiveFormsModule, MaterialModule],
  providers: [UserService],
})
export class SecurityModule {}
