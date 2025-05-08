import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/LoginRequest';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage : string = '';

  private router = inject(Router)
  private authService = inject(AuthService);

  loginRequest : LoginRequest = {
    username : '',
    password : ''
  }

  onLogin() {
    this.authService.login(this.loginRequest)
      .subscribe({
        next: (result) => {
          console.log(result);
          if (result.ok) {
            this.router.navigate(['/explore-page']);
          } 
          else {
            this.errorMessage = result.message;
          }
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      });
  }

  closeAlert() : void {
    this.errorMessage = '';
  }
}