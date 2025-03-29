import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { EquipmentViewComponent } from './equipment-view/equipment-view.component';
import { CoursesViewComponent } from './courses-view/courses-view.component';
import { CreatePostComponent } from './create-post/create-post.component';

export const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'explore-page',
    component : ExplorePageComponent,
    canActivate : [AuthGuard],
    children: [
      { path: 'posts', component: PostsViewComponent },
      { path: 'equipment', component: EquipmentViewComponent },
      { path: 'courses', component: CoursesViewComponent },
      { path: '', redirectTo: 'posts', pathMatch: 'full' } // Default child
    ]
  },
  {
    path : 'create-post',
    component : CreatePostComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }