import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost/sawarni/api/posts/';

  private http = inject(HttpClient);

  getAllPostDisplays() : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'GetAllPostDisplays.php', null);
  }

  addPost(textContent : string, selectedFiles : File[]) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('textContent', textContent);
    selectedFiles.forEach(
      (file, index) => {
        formData.append(`file${index}`, file, file.name);
      }
    );
    return this.http.post<ApiResponse>(this.apiUrl + 'AddPost.php', formData);
  }

  deletePost(postId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('postId', postId.toString());
    return this.http.post<ApiResponse>(this.apiUrl + 'DeletePost.php', formData);
  }

  getUserPosts(userId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    return this.http.post<ApiResponse>(this.apiUrl + 'GetUserPostDisplays.php', formData);
  }

}
