import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Attachment } from '../../interfaces/Attachment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-study',
  imports: [],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css'
})
export class StudyComponent implements OnInit {

  courseId! : number;
  courseTitle! : string;
  attachments! : Attachment[];

  private route = inject(ActivatedRoute);
  private coursesService = inject(CoursesService);
  sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = Number(params['courseId']);
    });
    this.loadCourse()
  }

  
  loadCourse() {
    this.coursesService.getCourse(this.courseId).subscribe({
      next : (response) => {
        if (response.ok) {
          this.attachments = response.body.course.attachments;
          this.courseTitle = response.body.course.title;
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

}
