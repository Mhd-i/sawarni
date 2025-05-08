import { Component, inject, Input } from '@angular/core';
import { CourseDisplay } from '../../interfaces/CourseDisplay';
import { CoursesService } from '../../services/courses.service';
import { CourseDisplayComponent } from '../content-displays/course-display/course-display.component';

@Component({
  selector: 'app-view-user-courses',
  imports: [CourseDisplayComponent],
  templateUrl: './view-user-courses.component.html',
  styleUrl: './view-user-courses.component.css'
})
export class ViewUserCoursesComponent {
  courses : CourseDisplay[] = [];
  isLoading = true;
  error : string | null = null;
  
  @Input() userId : number = 0;
  private coursesService = inject(CoursesService);
  
  ngOnInit(): void {
    this.loadUserCourses();

  }

  loadUserCourses() {
    this.coursesService.getUserCourses(this.userId)
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.courses = [...result.body];
            this.isLoading = false;
          } 
          else {
            alert(result.message);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error('user profile error :', err);
          alert("An error occurred while getting user courses");
          this.isLoading = false;
        }
      });

  }
}
