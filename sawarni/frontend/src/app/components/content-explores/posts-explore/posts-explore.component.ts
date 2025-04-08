import { Component } from '@angular/core';
import { PostsViewComponent } from "../../content-views/posts-view/posts-view.component";
import { SearchBarComponent } from "../../search-bar/search-bar.component";

@Component({
  selector: 'app-posts-explore',
  imports: [PostsViewComponent, SearchBarComponent],
  templateUrl: './posts-explore.component.html',
  styleUrl: './posts-explore.component.css'
})
export class PostsExploreComponent {
  
}
