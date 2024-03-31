import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../lib/material/material.module';
import { UsersComponent } from './components/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AgentsComponent } from './components/agents/agents.component';
import { AgentComponent } from './components/agent/agent.component';
import { AgentService } from './services/agent.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { OptionsService } from '../shared/services/options.service';

@NgModule({
  declarations: [UserRegistrationComponent, UsersComponent, LayoutComponent, AgentsComponent, AgentComponent],

  imports: [CommonModule, SecurityRoutingModule, ReactiveFormsModule, MaterialModule, NgSelectModule],
  providers: [UserService, AgentService, OptionsService],
})
export class SecurityModule {}
