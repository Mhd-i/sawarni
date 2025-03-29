import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UseraccountsService } from '../services/useraccounts.service';
import { LoginRequest } from '../interfaces/LoginRequest';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  http = inject(HttpClient);

  constructor(private router : Router) {}

  usersAccountService = inject(UseraccountsService);

  loginRequest : LoginRequest = {
    in_user_name : '',
    in_password : ''
  }


  onLogin() {
    this.usersAccountService.login(this.loginRequest)
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.router.navigate(['/explore-page']);
          } 
          else {
            alert(result.message);
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert("An error occurred during login");
        }
      });
  }


  /*
  onLogin() {
    let apiUrl = 'https://dummyjson.com/auth/login';
    this.http.post(apiUrl, this.loginObject).subscribe((response : any) => {
      this.router.navigate(['/explore-page']);
      localStorage.setItem('loggedInUserName', response.username);
    })
  }
  */

}
