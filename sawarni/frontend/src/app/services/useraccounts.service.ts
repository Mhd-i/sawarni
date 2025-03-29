import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { UserResponse } from '../interfaces/UserResponse';

@Injectable({
  providedIn: 'root'
})

export class UseraccountsService {
  private apiUrl = 'http://localhost/sawarni/getUser.php';
  
  private isAuthentificated = false;
  private http = inject(HttpClient);

  login(loginRequest : LoginRequest) : Observable<UserResponse> {
    const formData = new FormData();
    formData.append('in_user_name', loginRequest.in_user_name);
    formData.append('in_password', loginRequest.in_password);

    return this.http.post(this.apiUrl, formData).pipe(
      tap((response: any) => {
        if (response.ok) {
          this.isAuthentificated = true;
          localStorage.setItem('isAuthentificated', 'true');
          localStorage.setItem('loggedInUserId', response.user_id.toString());
        }
      })
    );
  }

  isLoggedIn() {
    return this.isAuthentificated;
  }

/*
  getUserWith(loginRequest : LoginRequest) : Observable<UserResponse> {
    const formData = new FormData();
    formData.append('in_user_name', loginRequest.in_user_name);
    formData.append('in_password', loginRequest.in_password);
    return this.http.post<any>(this.apiUrl, formData);
  }
*/
}
