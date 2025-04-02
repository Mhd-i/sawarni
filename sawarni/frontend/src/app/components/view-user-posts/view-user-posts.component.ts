import { Component, inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PostDisplay } from '../../interfaces/PostDisplay';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { PostDisplayComponent } from '../content-displays/post-display/post-display.component';


@Component({
  selector: 'app-view-user-posts',
  imports: [PostDisplayComponent],
  templateUrl: './view-user-posts.component.html',
  styleUrl: './view-user-posts.component.css'
})
export class ViewUserPostsComponent {
  posts : PostDisplay[] = [];
  isLoading = true;
  error : string | null = null;
  displayOptions : string = 'all';
  userId : string = '0';
 
  private postService = inject(PostsService);
 
  ngOnInit(): void {
    this.loadUserPosts();
  }
 
  loadUserPosts() {
    this.isLoading = true;
    this.error = null;
    
    const userIdFormData = new FormData();
    userIdFormData.append('user_id', this.userId)
 
    this.postService.getUserPosts(userIdFormData)
      .subscribe({
        next : (result) => {
          if (result.ok) {
            this.posts = result.body;
            this.isLoading = false;
          }
          else {
            console.error('error retrieving posts : ', result.message);
            this.isLoading = false;
          }
        },
        error : (err) => {
          this.error = "failed to load.";
          this.isLoading = false;
          console.log("Error Handling Posts : ", err);
        }
      });
  }
}
