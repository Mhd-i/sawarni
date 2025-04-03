import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/sawarni/';

  private http = inject(HttpClient);

  getUserProfile(user_id : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('user_id', user_id.toString())
    return this.http.post<ApiResponse>(this.apiUrl + "getUserProfile.php", formData)
  }

  updateUserProfile(new_profile : FormData) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'updateUserProfile.php', new_profile);
  }

  suggestUsingKeyword(keyword : FormData) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'suggestUsingKeyword.php', keyword);
  }


}
