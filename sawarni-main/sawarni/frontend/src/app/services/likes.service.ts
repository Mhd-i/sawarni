import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private apiUrl = 'http://localhost/sawarni/';

  private http = inject(HttpClient);

  addLike(user_id : number, post_id : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('post_id', post_id.toString());
    
    return this.http.post<ApiResponse>(this.apiUrl + 'addLike.php', formData)
  }

  removeLike(user_id : number, post_id : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('post_id', post_id.toString());

    return this.http.post<ApiResponse>(this.apiUrl + 'removeLike.php', formData);
  }

}
