import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import { PostObject } from '../objects/PostObject';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-generic-post',
  templateUrl: './generic-post.component.html',
  styleUrls: ['./generic-post.component.css'],
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
export class GenericPostComponent implements AfterViewInit {
  @Input() post!: PostObject;
  animationState = 'hidden';

  constructor(private el: ElementRef) {}

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
}