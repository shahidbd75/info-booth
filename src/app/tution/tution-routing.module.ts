import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { TutionPostsComponent } from './pages/tution-posts/tution-posts.component';
import { TutorComponent } from './pages/tutor/tutor.component';
import { TutorsComponent } from './pages/tutors/tutors.component';
import { TutionPostComponent } from './pages/tution-post/tution-post.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'post', component: TutionPostComponent },
      { path: 'post/:id', component: TutionPostComponent },
      { path: 'posts', component: TutionPostsComponent },
      { path: 'tutor', component: TutorComponent },
      { path: 'tutor/:id', component: TutorComponent },
      { path: 'tutors', component: TutorsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutionRoutingModule {}
