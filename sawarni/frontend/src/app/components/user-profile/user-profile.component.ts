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

  private user_id : number = 0;
  private overlayRef!: OverlayRef;
  displayed_profile = {
    'user_name' : '',
    'profile_picture_path' : '',
    'join_date' : '',
    'location' : '',
    'resume_path' : '',
    'aboutMe' : ''
  }

  private userService = inject(UserService);
  private router = inject(Router);
  private overlay = inject(Overlay);
  private route = inject(ActivatedRoute);
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user_id = params['id'];
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
          this.displayed_profile['resume_path'] = result.body.resume_path;
          this.displayed_profile['aboutMe'] = result.body.aboutMe;
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
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    const portal = new ComponentPortal(ViewUserPostsComponent);

    const componentRef = this.overlayRef.attach(portal);
    
    componentRef.instance.userId = this.user_id;

    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  openViewEquipmentOverlay() : void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    const portal = new ComponentPortal(ViewUserPostsComponent);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  openViewCoursesOverlay() : void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    const portal = new ComponentPortal(ViewUserPostsComponent);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  closeOverlay() : void {
    this.overlayRef.dispose();
  }

  onMessageButtonClick() {
    this.router.navigate([`contact/${this.user_id}`]);
  }

}
