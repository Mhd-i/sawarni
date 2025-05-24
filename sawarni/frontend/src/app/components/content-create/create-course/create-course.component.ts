import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-create-course',
  imports: [FormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  title : string = '';
  description : string = '';
  price : number = 0.0;
  thumbnail! : File;
  attachments : File[] = [];

  private router = inject(Router);
  private coursesService = inject(CoursesService);

  onUpload() {
    this.coursesService.addCourse(this.title, this.description, this.price, this.thumbnail, this.attachments).subscribe({
      next : (response) => {
        if (response.ok) {
          this.onCancel();
          console.log('course added successfully', response);
        }
        else {
          console.error(response.message);
        }
      },
      error : (err) => {
        console.error(err);
      }
    })
  }

  onCancel() {
    this.router.navigate(['/explore-page'], { queryParams: { refresh: Date.now() } });
  }

  onThumbnailSelected(event : any) {
    // add selected files to the selectedFiles array
    if (event.target.files && event.target.files.length > 0) {
      this.thumbnail = Array.from<File>(event.target.files).at(0)!;
    }
  }

  onAttachmentsSelected(event : any) {
    // add selected files to the selectedFiles array
    if (event.target.files && event.target.files.length > 0) {
      this.attachments = Array.from(event.target.files);
    }
  }

}
