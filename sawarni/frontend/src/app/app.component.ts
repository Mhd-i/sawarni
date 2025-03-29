import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { NavbarMainComponent } from './explore_navbar/navbar-main/navbar-main.component';
import { LoginComponent } from './login/login.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostsViewComponent, DropdownButtonComponent, NavbarMainComponent, LoginComponent, ExplorePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
