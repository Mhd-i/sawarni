import { Component, inject, OnInit } from '@angular/core';
import { SubscriptionDisplay } from '../../interfaces/SubscriptionDisplay';
import { CoursesService } from '../../services/courses.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  imports: [],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  subscriptions : SubscriptionDisplay[] = [];
  myCourses : SubscriptionDisplay[] = [];
  loggedInUserId : number = 0;

  private coursesService = inject(CoursesService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getLoggedInUserId();

    this.getSubscriptions();
  }
  
  getLoggedInUserId() {
    this.userService.getLoggedInUserId().subscribe({
      next : (response) => {
        if (response.ok) {
          this.loggedInUserId = response.body.id;
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

  getSubscriptions() {
    this.coursesService.getUserSubscriptions().subscribe({
      next : (response) => {
        if (response.ok) {
          response.body.subscriptions.forEach((element : SubscriptionDisplay) => {
            if (element.creatorId == this.loggedInUserId) {
              this.myCourses.push(element)
            }
            else {
              this.subscriptions.push(element)
            }
          });
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

  removeSubscription(courseId : number) {
    this.coursesService.removeSubscription(courseId).subscribe({
      next : (response) => {
        if (response.ok) {
          console.log(response.message);
          const subscriptionIndex = this.subscriptions.findIndex((elem) => {
            elem.courseId == courseId
          })
          this.subscriptions.splice(subscriptionIndex);
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

  viewCourse(courseId : number) {
    this.router.navigate([`study/${courseId}`]);
  }

}
