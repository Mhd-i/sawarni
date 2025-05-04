import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/sawarni/api/useraccounts/';

  private http = inject(HttpClient);

  getUserProfile(userId? : number) : Observable<ApiResponse> {
    const formData = new FormData();
    if (userId) {
      formData.append('userId', userId.toString())
    }
    return this.http.post<ApiResponse>(this.apiUrl + "GetUserProfile.php", formData)
  }

  getUserProfilePicture(userId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    return this.http.post<ApiResponse>(this.apiUrl + "GetUserProfilePicture.php", formData)
  }

  updateUserProfile(new_profile : FormData) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'UpdateUserProfile.php', new_profile);
  }

  suggestUsingKeyword(keyword : FormData) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'SearchUsernames.php', keyword);
  }

  getLoggedInUserId() : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'GetLoggedInUserId.php', null);
  }

}
