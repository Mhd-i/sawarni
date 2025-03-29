// visibility.directive.ts
import { Directive, ElementRef, Output, EventEmitter, inject } from '@angular/core';

@Directive({
  selector: '[appInViewport]',
  standalone: true
})
export class InViewportDirective {
  private el = inject(ElementRef);
  @Output() visible = new EventEmitter<void>();

  constructor() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.visible.emit();
        observer.unobserve(this.el.nativeElement);
      }
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
}