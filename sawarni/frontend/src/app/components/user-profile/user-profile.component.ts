import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ViewUserPostsComponent } from '../view-user-posts/view-user-posts.component';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  private user_id : number = Number(localStorage.getItem('loggedInUserId'));
  private overlayRef!: OverlayRef;
  displayed_profile = {
    'user_name' : '',
    'profile_picture_path' : '',
    'join_date' : '',
    'location' : ''
  }

  private userService = inject(UserService);
  private router = inject(Router);
  private overlay = inject(Overlay);
  private route = inject(ActivatedRoute);
  
  ngOnInit(): void {
    console.log(this.user_id)
    this.route.params.subscribe(params => {
      this.user_id = params['id'] || this.user_id;
      this.loadUserProfile(Number(this.user_id));
    });

    
  }

  loadUserProfile(user_id : number) {
    this.userService.getUserProfile(user_id)
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

  onEdit() : void {
    this.router.navigate(['/user-profile-edit']);
  }

  onBack() : void {
    this.router.navigate(['/explore-page']);
  }
  
  openViewPostsOverlay() : void {
    // Create overlay
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    // Attach component to overlay
    const portal = new ComponentPortal(ViewUserPostsComponent);
    this.overlayRef.attach(portal);

    // Close on backdrop click
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  openViewEquipmentOverlay() : void {
    // Create overlay
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    // Attach component to overlay
    const portal = new ComponentPortal(ViewUserPostsComponent);
    this.overlayRef.attach(portal);

    // Close on backdrop click
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  openViewCoursesOverlay() : void {
    // Create overlay
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    // Attach component to overlay
    const portal = new ComponentPortal(ViewUserPostsComponent);
    this.overlayRef.attach(portal);

    // Close on backdrop click
    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  closeOverlay() : void {
    this.overlayRef.dispose();
  }

}
