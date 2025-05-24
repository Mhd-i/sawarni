import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { UserResponse } from '../interfaces/UserResponse';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost/sawarni/Login.php';
  
  private http = inject(HttpClient);
  private router = inject(Router);

  login(loginRequest : LoginRequest) : Observable<UserResponse> {
    const formData = new FormData();
    formData.append('username', loginRequest.username);
    formData.append('password', loginRequest.password);

    return this.http.post<ApiResponse>(this.apiUrl, formData).pipe(
      tap((response: any) => {
        if (response.ok) {
          localStorage.setItem('token', response.body.token);
        }
      })
    );
  }

  logout() : void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

}
