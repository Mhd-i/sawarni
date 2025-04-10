import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private apiUrl = 'http://localhost/sawarni/api/likes/';

  private http = inject(HttpClient);

  addLike(postId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('postId', postId.toString());
    
    return this.http.post<ApiResponse>(this.apiUrl + 'AddLike.php', formData)
  }

  removeLike(postId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('postId', postId.toString());

    return this.http.post<ApiResponse>(this.apiUrl + 'RemoveLike.php', formData);
  }

}
