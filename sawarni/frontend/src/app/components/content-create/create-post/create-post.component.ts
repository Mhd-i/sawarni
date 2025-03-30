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
  text_content : string = '';

  private router = inject(Router);
  private postService = inject(PostsService);

  onFileSelected(event : any) {
    // add selected files to the selectedFiles array
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onUpload() {
    if (this.selectedFiles.length === 0) {
      alert('Please select atleast one file first');
      return;
    }

    // get user id
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) throw new Error('User not logged in');

    // create form data
    const formData = new FormData();
    formData.append('posted_by', userId);
    formData.append('text_content', this.text_content);
    this.selectedFiles.forEach(
      (file, index) => {
        formData.append(`file${index}`, file, file.name);
      }
    );

    this.postService.addPost(formData)
      .subscribe(
        (response) => {
          console.log('File Uploaded Successfully', response);
        },
        (error) => {
          console.error('Error Uploading File', error);
        }
  );;
    
    this.router.navigate(['/explore-page']);
  }

  onCancel() {
    this.router.navigate(['/explore-page']);
  }

}
