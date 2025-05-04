import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = 'http://localhost/sawarni/api/courses/';

  private http = inject(HttpClient);

  getAllCourseDisplays() : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'getAllCourseDisplays.php', null);
  }

  addSubscription(courseId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('courseId', courseId.toString());
    return this.http.post<ApiResponse>(this.apiUrl + 'addSubscription.php', formData);
  }

  getUserSubscriptions() : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'getUserSubscriptions.php', null);
  }

  getCourse(courseId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('courseId', courseId.toString());
    return this.http.post<ApiResponse>(this.apiUrl + 'getCourse.php', formData);
  }

  removeSubscription(courseId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('courseId', courseId.toString());
    return this.http.post<ApiResponse>(this.apiUrl + 'removeSubscription.php', formData)
  }

  addCourse(title : string, description : string, price : number, thumbnail : File, attachments : File[]) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('thumbnail', thumbnail, thumbnail.name);
    attachments.forEach(
      (file, index) => {
        formData.append(`file${index}`, file, file.name);
      }
    );
    return this.http.post<ApiResponse>(this.apiUrl + 'addCourse.php', formData);
  }

}
