import { Component } from '@angular/core';
import { NavbarMainComponent } from '../explore_navbar/navbar-main/navbar-main.component';
import { PostsViewComponent } from '../posts-view/posts-view.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-explore-page',
  imports: [NavbarMainComponent, PostsViewComponent, RouterOutlet],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})
export class ExplorePageComponent {

}
