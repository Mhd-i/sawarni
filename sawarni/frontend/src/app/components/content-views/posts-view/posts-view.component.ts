import { Component, inject, OnInit } from '@angular/core';
import { PostDisplay } from '../../../interfaces/PostDisplay';
import { PostsService } from '../../../services/posts.service';
import { PostDisplayComponent } from '../../content-displays/post-display/post-display.component';


@Component({
  selector: 'app-posts-view',
  imports: [PostDisplayComponent],
  templateUrl: './posts-view.component.html',
  styleUrl: './posts-view.component.css'
})
export class PostsViewComponent implements OnInit {
  
  posts : PostDisplay[] = [];
  isLoading = true;
  error : string | null = null;

  private postService = inject(PostsService)

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.error = null;


    this.postService.getPosts()
      .subscribe({
        next : (result) => {
          console.log('aa')
          console.log(result);
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
