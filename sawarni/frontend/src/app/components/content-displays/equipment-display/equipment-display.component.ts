import { Component, Input } from '@angular/core';
import { EquipmentDisplay } from '../../../interfaces/EquipmentDisplay';

@Component({
  selector: 'app-equipment-display',
  imports: [],
  templateUrl: './equipment-display.component.html',
  styleUrl: './equipment-display.component.css'
})
export class EquipmentDisplayComponent {

  @Input() equipment! : EquipmentDisplay;

  

}
