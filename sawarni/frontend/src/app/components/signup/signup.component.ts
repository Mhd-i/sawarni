import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/ApiResponse';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username : string = '';
  password : string = '';
  aboutMe : string = '';
  location : string = '';
  profilePicture! : File;

  errorMessage : string = '';

  private router = inject(Router)
  private authService = inject(AuthService);
  private userService = inject(UserService);

  observe(observable : Observable<ApiResponse>, execute : any) {
    observable.subscribe({
      next: (response) => {
        if (response.ok) {
          execute();
        }
        else {
          console.error(response.message);
        }
      },
      error : (err) => {
        console.error(err);
      }
    })
  }

  onSignUp() : void {
    this.userService.addUser(this.username, this.password, this.location, this.aboutMe, this.profilePicture).subscribe({
      next: (response) => {
        if (response.ok) {
          this.onLogin();
        }
        else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  onLogin() {
    this.authService.login({'username' : this.username, 'password' : this.password})
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

  onFileSelected(event : any) {
    if (event.target.files && event.target.files.length > 0) {
      this.profilePicture = event.target.files[0];
    }
  }

  onSwitchToLogin() : void {
    this.router.navigate(['login']);
  }

}
