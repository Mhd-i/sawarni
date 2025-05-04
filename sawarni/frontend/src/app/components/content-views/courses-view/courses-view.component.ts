import { Component, inject } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { CourseDisplay } from '../../../interfaces/CourseDisplay';
import { CourseDisplayComponent } from '../../content-displays/course-display/course-display.component';

@Component({
  selector: 'app-courses-view',
  imports: [CourseDisplayComponent],
  templateUrl: './courses-view.component.html',
  styleUrl: './courses-view.component.css'
})
export class CoursesViewComponent {

  courses : CourseDisplay[] = [];
  isLoading = true;
  error : string | null = null;
  canEdit : boolean = false;
  canDelete : boolean = false;

  private coursesService = inject(CoursesService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.error = null;

    this.coursesService.getAllCourseDisplays()
      .subscribe({
        next : (response) => {
          if (response.ok) {
            this.courses = response.body;
            this.isLoading = false;
          }
          else {
            console.error('error retrieving posts : ', response.message);
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
