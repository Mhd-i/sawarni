import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost/sawarni/';

  private http = inject(HttpClient);


  getPosts() : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'getPostDisplays.php', null);
  }

  addPost(postFormData : FormData) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'addPost.php', postFormData);
  }

  getUserPosts(userIdFormData : FormData) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'getPostDisplays.php', userIdFormData);
  }

  deletePost(formData : FormData) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'deletePost.php', formData);
  }

}
