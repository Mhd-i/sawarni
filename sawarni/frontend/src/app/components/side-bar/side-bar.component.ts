import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AddContentComponent } from '../add-content/add-content.component';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  loggedInUserProfilePicturePath : string = '';
  loggedInUsername : string = '';
  loggedInUserId : number = 0;
  private overlayRef!: OverlayRef;
  
  private userService = inject(UserService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private overlay = inject(Overlay);
  
  ngOnInit(): void {
    this.userService.getUserProfile()
      .subscribe({
        next : (response) => {
          if (response.ok) {
            this.loggedInUserId = response.body.id;
            this.loggedInUsername = response.body.username
            console.error(response.body.profilePicturePath)
            this.loggedInUserProfilePicturePath = response.body.profilePicturePath
          }
          else {
            console.error(response.message)
          }
        },
        error : (err) => {
          console.error('error getting logged in user account : ', err);
        }
      })
  }

  clickMyProfile() : void {
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
    })

  }

  clickLogout() : void {
    this.authService.logout()
  }

  clickMyCourses() : void {
    this.router.navigate(['my-courses']);
  }

  clickContacts() : void {
    this.router.navigate(['contact/0']);
  }

  clickAddContent() : void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically(),
    });
  
    const portal = new ComponentPortal(AddContentComponent);
    const componentRef = this.overlayRef.attach(portal);

    componentRef.instance.overlayRef = this.overlayRef;
    
    // Make sure ViewImagesComponent has an @Input() for images
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());

  }

  closeOverlay() : void {
    this.overlayRef.dispose();
  }

}
