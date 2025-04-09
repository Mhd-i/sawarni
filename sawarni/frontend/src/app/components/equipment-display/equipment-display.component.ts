import { Component, Input, ElementRef, AfterViewInit, inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LikesService } from '../../services/likes.service';
import { EquipmentsService } from '../../services/equipment.service';
import { EquipmentDisplay } from '../../interfaces/EquipmentDisplay';

@Component({
  selector: 'app-equipment-display',
  templateUrl: './equipment-display.component.html',
  styleUrls: ['./equipment-display.component.css'],
})
export class EquipmentDisplayComponent implements AfterViewInit {

  // Input Properties
  @Input() equipment!: EquipmentDisplay;

  // Component State
  animationState = 'hidden';

  // Dependency Injection
  private readonly el = inject(ElementRef);

  /* ------------------------- Lifecycle Methods ------------------------- */

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    //  this.setupIntersectionObserver();
  }

  /* ------------------------- Private Methods ------------------------- */

  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.animationState = entry.isIntersecting ? 'visible' : 'hidden';
      });
    }, {
      root: null,
      threshold: 0.15
    });

    observer.observe(this.el.nativeElement);
  }

  /* ------------------------- Public Methods ------------------------- */


  /* ------------------------- Action Handlers ------------------------- */

} 
