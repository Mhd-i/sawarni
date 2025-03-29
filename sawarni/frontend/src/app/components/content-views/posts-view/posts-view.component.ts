import { Component, inject, OnInit } from '@angular/core';
import { PostObject } from '../../../interfaces/PostObject';
import { PostsService } from '../../../services/posts.service';
import { PostDisplayComponent } from '../../content-displays/post-display/generic-post.component';


@Component({
  selector: 'app-posts-view',
  imports: [PostDisplayComponent],
  templateUrl: './posts-view.component.html',
  styleUrl: './posts-view.component.css'
})
export class PostsViewComponent implements OnInit {
  
  posts : PostObject[] = [];
  isLoading = true;
  error : string | null = null;

  private postService = inject(PostsService)

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.error = null;


    this.postService.getPosts().subscribe({
      next : (posts) => {
        this.posts = posts;
        console.log(posts)
        this.isLoading = false;
      },
      error : (err) => {
        this.error = "failed to load.";
        this.isLoading = false;
        console.log("Error Handling Posts : ", err);
      }
    })
  }

  
  
}
