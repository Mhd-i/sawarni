import { Component, inject, OnInit } from '@angular/core';
import { PostDisplay } from '../../../interfaces/PostDisplay';
import { PostsService } from '../../../services/posts.service';
import { PostDisplayComponent } from '../../content-displays/post-display/post-display.component';
import { ActivatedRoute } from '@angular/router';


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
  displayOptions : string = 'all';
  user_id : string = '0';

  private postService = inject(PostsService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.displayOptions = params.get('displayOptions') || 'all';
      this.user_id = params.get('user_id') || '0';
    })
    this.loadPosts();
  }

  loadPosts() {
    switch (this.displayOptions) {
      case 'all':
        this.loadAllPosts();
        break;
      case 'user':
        this.loadUserPosts(this.user_id);
        break;


    }
  }

  loadAllPosts() {
    this.isLoading = true;
    this.error = null;


    this.postService.getAllPostDisplays()
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

  loadUserPosts(user_id : string) {

  }
  
  
}
