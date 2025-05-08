import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  imports: [FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
  @Input() postId! : number;

  selectedFiles: File[] = [];
  textContent : string = '';

  private router = inject(Router);
  private postService = inject(PostsService);
  private route = inject(ActivatedRoute);

  private paramSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.postId = Number(params['postId']);
    });
  }

  onCancel() : void {
    this.router.navigate(['/explore-page'], { queryParams: { refresh: Date.now() } });
  }

  onEdit() : void {
    this.postService.editPost(this.postId, this.textContent, this.selectedFiles).subscribe({
      next: (response) => {
        if (response.ok) {
          console.log(response.message)
        }
        else {
          console.error(response.message);
        }
      },
      error: (err) => {
        console.error('');
      }
    });
  }

  onFileSelected(event : any) {
    // add selected files to the selectedFiles array
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  
}
