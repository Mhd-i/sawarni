import { Component } from '@angular/core';
import { PostsViewComponent } from "../../content-views/posts-view/posts-view.component";
import { SearchBarComponent } from "../../search-bar/search-bar.component";
import { RecentContactsComponent } from '../../recent-contacts/recent-contacts.component';

@Component({
  selector: 'app-posts-explore',
  imports: [PostsViewComponent, SearchBarComponent, RecentContactsComponent],
  templateUrl: './posts-explore.component.html',
  styleUrl: './posts-explore.component.css'
})
export class PostsExploreComponent {
  
}
