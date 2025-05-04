import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PostsViewComponent } from './components/content-views/posts-view/posts-view.component';
import { EquipmentViewComponent } from './components/content-views/equipment-view/equipment-view.component';
import { CoursesViewComponent } from './components/content-views/courses-view/courses-view.component';
import { CreatePostComponent } from './components/content-create/create-post/create-post.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { PostsExploreComponent } from './components/content-explores/posts-explore/posts-explore.component';
import { EquipmentsExploreComponent } from './components/content-explores/equipments-explore/equipments-explore.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { StudyComponent } from './components/study/study.component';
import { CreateCourseComponent } from './components/content-create/create-course/create-course.component';


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
      { path: 'equipment', component: EquipmentsExploreComponent },
      { path: 'courses', component: CoursesViewComponent },
      { path: '', redirectTo: 'posts', pathMatch: 'full' }
    ]
  },
  {
    path : 'create-post',
    component : CreatePostComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'create-course',
    component : CreateCourseComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'user-profile/:id',
    component : UserProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'user-profile-edit',
    component : UserProfileEditComponent,
    canActivate : [AuthGuard],
  },
  {
    path : 'contact/:userId',
    component : ContactComponent,
    canActivate : [AuthGuard],
  },
  {
    path : 'my-courses',
    component : MyCoursesComponent,
    canActivate : [AuthGuard],
  },
  {
    path : 'study/:courseId',
    component : StudyComponent,
    canActivate : [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }