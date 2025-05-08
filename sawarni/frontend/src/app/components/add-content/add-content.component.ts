import { OverlayRef } from '@angular/cdk/overlay';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-content',
  imports: [],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.css'
})
export class AddContentComponent {

  @Input() overlayRef! : OverlayRef;

  private router = inject(Router);

  clickAddPost() : void {
    this.router.navigate(['create-post']);
    this.closeOverlay();
  }
  
  clickAddEquipment() : void {
    this.router.navigate(['create-equipment']);
    this.closeOverlay();
  }

  clickAddCourse() : void {
    this.router.navigate(['create-course']);
    this.closeOverlay();
  }

  closeOverlay() : void {
    this.overlayRef.dispose();
  }
  

}
