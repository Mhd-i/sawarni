import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  private user_id = Number(localStorage.getItem('loggedInUserId'));
  private userService = inject(UserService);

  displayed_profile = {
    'user_name' : '',
    'profile_picture_path' : '',
    'join_date' : '',
    'location' : ''
  }
  
  ngOnInit(): void {
    this.userService.getUserProfile(this.user_id)
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.displayed_profile['user_name'] = result.body.user_name;
            this.displayed_profile['profile_picture_path'] = result.body.profile_picture_path;
            this.displayed_profile['join_date'] = result.body.join_date;
            this.displayed_profile['location'] = result.body.location;
          } 
          else {
            alert(result.message);
          }
        },
        error: (err) => {
          console.error('user profile error :', err);
          alert("An error occurred while getting user profile");
        }
      });
  }
  

}
