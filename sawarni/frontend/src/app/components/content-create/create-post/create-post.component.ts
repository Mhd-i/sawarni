import { Component, inject } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  selectedFiles: File[] = [];
  textContent : string = '';

  private router = inject(Router);
  private postService = inject(PostsService);

  onFileSelected(event : any) {
    // add selected files to the selectedFiles array
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onUpload() {
    this.postService.addPost(this.textContent, this.selectedFiles)
      .subscribe(
        (response) => {
          if (response.ok) {
            console.log('Post Added Successfully', response);
            this.onCancel()
          }
          else {
            console.error(response.message);
          }
        },
        (error) => {
          console.error('Error adding post', error);
        }
      );
  }

  onCancel() {
    this.router.navigate(['/explore-page'], { queryParams: { refresh: Date.now() } });
  }

}
