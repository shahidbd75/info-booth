import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutionRoutingModule } from './tution-routing.module';
import { TutorsComponent } from './pages/tutors/tutors.component';
import { TutorComponent } from './pages/tutor/tutor.component';
import { TutionPostsComponent } from './pages/tution-posts/tution-posts.component';
import { TutionPostComponent } from './pages/tution-post/tution-post.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../lib/material/material.module';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [TutorsComponent, TutorComponent, TutionPostsComponent, TutionPostComponent, LayoutComponent],
  imports: [CommonModule, TutionRoutingModule, RouterModule, MaterialModule, FormsModule, SharedModule],
})
export class TutionModule {}
