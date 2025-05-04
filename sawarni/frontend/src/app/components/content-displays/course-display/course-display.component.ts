import { Component, inject, Input } from '@angular/core';
import { CourseDisplay } from '../../../interfaces/CourseDisplay';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-course-display',
  imports: [],
  templateUrl: './course-display.component.html',
  styleUrl: './course-display.component.css'
})
export class CourseDisplayComponent {

  @Input() course!: CourseDisplay;

  private coursesService = inject(CoursesService);

  subscribeClick() : void {
    this.coursesService.addSubscription(this.course.id).subscribe({
      next : (response) => {
        if (response.ok) {
          console.log(response.message)
          this.course.subscribedByThisUser = true;
          this.course.subscriberCount++;
        }
        else {
          console.error(response.message)
        }
      },
      error : (err) => {
        console.error(err)
      }
    })
  }

  unSubscribeClick() : void {
    this.coursesService.removeSubscription(this.course.id).subscribe({
      next : (response) => {
        if (response.ok) {
          this.course.subscribedByThisUser = false;
          this.course.subscriberCount--;
        }
        else {
          console.error(response.message);
        }
      },
      error : (err) => {
        console.error(err);
      }
    });
  }

}
