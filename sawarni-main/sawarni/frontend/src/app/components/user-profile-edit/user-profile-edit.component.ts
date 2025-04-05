import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile-edit',
  imports: [FormsModule],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.css'
})
export class UserProfileEditComponent implements OnInit {
  private user_id = Number(localStorage.getItem('loggedInUserId'));
  private userService = inject(UserService);
  private router = inject(Router);


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

  onSave() : void {
    const formData = new FormData();
    formData.append('user_id', localStorage.getItem("loggedInUserId")!);
    formData.append('user_name', this.displayed_profile["user_name"]);
    formData.append('profile_picture_path', this.displayed_profile["profile_picture_path"].replace('http://localhost/sawarni/', ''));
    formData.append('location', this.displayed_profile["location"]);
    this.userService.updateUserProfile(formData)
      .subscribe({
        next : (response) => {
          if (response.ok) {
            console.log('changed user profile to : ', response.body);
          }
          else {
            console.error(response.message);
          }
        },
        error : (err) => {console.error(err)}
      });

    this.router.navigate(['/user-profile']);
  }

  onBack() {
    this.router.navigate(['/explore-page']);
  }

}
