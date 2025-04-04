import { Component, Input, ElementRef, AfterViewInit, inject, Injector } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PostDisplay } from '../../../interfaces/PostDisplay';
import { LikesService } from '../../../services/likes.service';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ViewImagesComponent } from '../../view-images/view-images.component';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css'],
  animations: [
    trigger('fadeIn', [
      state('hidden', style({ 
        opacity: 0, 
        transform: 'translateY(20px) scale(0.98)' 
      })),
      state('visible', style({ 
        opacity: 1, 
        transform: 'translateY(0) scale(1)' 
      })),
      transition('hidden => visible', [
        animate('500ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ]),
      transition('visible => hidden', [ // Optional: Reverse animation
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class PostDisplayComponent implements AfterViewInit {
  
  @Input() post!: PostDisplay;
  @Input() displayOptions = {canEdit : true, canDelete : true};

  liked : boolean = false;
  viewAllAttachments : boolean = false;
  animationState = 'hidden';
  private overlayRef!: OverlayRef;

  private likesService = inject(LikesService);
  private postsService = inject(PostsService);
  private el = inject(ElementRef);
  private router = inject(Router);
  private overlay = inject(Overlay);


  ngOnInit() {
    if (this.post?.liked_by_users) {
      const userId = localStorage.getItem('loggedInUserId') || '';
      this.liked = this.post.liked_by_users.includes(userId);
    }

    console.log(this.post.attachments[0].file_path)
  }

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% of the post is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animationState = 'visible';
        } else {
          // Optional: Reset to hidden when leaving viewport (for re-triggering)
          this.animationState = 'hidden';
        }
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }

  likePost() {
    if (this.liked === false) {
      this.likesService.addLike(Number(localStorage.getItem('loggedInUserId')), Number(this.post.id))
        .subscribe({
          next: (response) => {
            this.liked = true;
            this.post.likes_count++;
          },
          error: (err) => console.error('Error Adding like', err)
        });
    }
    else {
      this.likesService.removeLike(Number(localStorage.getItem('loggedInUserId')), Number(this.post.id))
        .subscribe({
          next: (response) => {
            this.liked = false;
            this.post.likes_count--;
          },
          error: (err) => console.error('Error Removing like', err)
        });;
      this.liked = false;
    }
      
  }

  deletePost() {
    const userId = localStorage.getItem('loggedInUserId') || '';
    const postId = this.post.id.toString();
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('post_id', postId);
    this.postsService.deletePost(formData)
      .subscribe({
        next: (response) => {
          alert(response.message);
        },
        error: (err) => console.error('Error Deleting Post', err)
      });
  }

  editPost() {

  }
  
  onProfilePictureClick() {
    this.router.navigate(['/user-profile'])
  }

  openAttachmentsView(): void {
    this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        positionStrategy: this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically(),
    });
    
    const portal = new ComponentPortal(ViewImagesComponent);
    const componentRef = this.overlayRef.attach(portal);
    
    // Pass data directly to the component instance
    componentRef.instance.attachments = this.post.attachments;
    // Make sure ViewImagesComponent has an @Input() for images

    this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());

  }

  closeOverlay() : void {
    this.overlayRef.dispose();
  }

  onViewMoreAttachments() {
    this.viewAllAttachments = true;
  }

  onViewLessAttachments() {
    this.viewAllAttachments = false;
  }
  
}