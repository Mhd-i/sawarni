import { Component, inject, Input } from '@angular/core';
import { EquipmentDisplay } from '../../../interfaces/EquipmentDisplay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-display',
  imports: [],
  templateUrl: './equipment-display.component.html',
  styleUrl: './equipment-display.component.css'
})
export class EquipmentDisplayComponent {

  @Input() equipment! : EquipmentDisplay;

  private router = inject(Router);

  contactOwner() : void {
    this.router.navigate([`contact/${this.equipment.sellerId}`]);
  }

}
