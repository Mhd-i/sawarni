import { Component, inject } from '@angular/core';
import { DropdownButtonComponent } from '../../dropdown-button/dropdown-button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar-main-right',
  imports: [DropdownButtonComponent],
  templateUrl: './navbar-main-right.component.html',
  styleUrl: './navbar-main-right.component.css'
})
export class NavbarMainRightComponent {

  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  addContentButtonOptions = [
    {label : 'new Post', onclick : () => {this.router.navigate(['/create-post'])}},
    {label : 'new Equipement', onclick : () => {alert("Test")}},
    {label : 'new Course', onclick : () => {alert("Test")}},
  ];

  settingsButtonOptions = [
    {label : 'Profile', onclick : () => {
      this.userService.getLoggedInUserId().subscribe({
        next : (result) => {
          if (result.ok) {
            console.log(result.body.id)
            this.router.navigate([`/user-profile/${result.body.id}`]);
          }
          else {
            alert(result.message)
          }
        },
        error : (err) => {
          console.error('Error getting logged in user id : ', err);
        }
      });
      
    }},
    {label : 'Logout', onclick : () => {
      this.authService.logout();
    }},
  ];
}
