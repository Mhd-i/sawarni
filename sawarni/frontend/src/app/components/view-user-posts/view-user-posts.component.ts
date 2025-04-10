import { Component, inject, Input, OnInit } from '@angular/core';
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
export class ViewUserPostsComponent implements OnInit {
  posts : PostDisplay[] = [];
  isLoading = true;
  error : string | null = null;
  
  @Input() userId : number = 0;
  private postService = inject(PostsService);
  
  ngOnInit(): void {
    this.loadUserPosts();

  }

  loadUserPosts() {
    this.postService.getUserPosts(this.userId)
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.posts = [...result.body];
            this.isLoading = false;
          } 
          else {
            alert(result.message);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error('user profile error :', err);
          alert("An error occurred while getting user posts");
          this.isLoading = false;
        }
      });

  }
  

}
