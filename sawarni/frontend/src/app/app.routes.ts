import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PostsViewComponent } from './components/content-views/posts-view/posts-view.component';
import { CoursesViewComponent } from './components/content-views/courses-view/courses-view.component';
import { CreatePostComponent } from './components/content-create/create-post/create-post.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { PostDisplayComponent } from './components/content-displays/post-display/post-display.component';
import { EquipmentDisplayComponent } from './components/equipment-display/equipment-display.component';
import { EquipmentsViewComponent } from './components/content-views/equipments-view/equipments-view.component';



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
      { path: 'equipments', component: EquipmentsViewComponent },
      { path: 'courses', component: CoursesViewComponent },
      { path: '', redirectTo: 'posts', pathMatch: 'full' } // Default child
    ]
  },
  {
    path : 'create-post',
    component : CreatePostComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'user-profile',
    component : UserProfileComponent
  },
  {
    path : 'user-profile/:id',
    component : UserProfileComponent
  },
  {
    path : 'user-profile-edit',
    component : UserProfileEditComponent
  },
  {
    path : 'view-posts',
    component : PostsViewComponent
  },
 
  {
    path : 'view-courses',
    component : CoursesViewComponent
  },
  
    
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }