import { Component, inject, Input } from '@angular/core';
import { EquipmentDisplay } from '../../interfaces/EquipmentDisplay';
import { EquipmentService } from '../../services/equipment.service';
import { EquipmentDisplayComponent } from '../content-displays/equipment-display/equipment-display.component';

@Component({
  selector: 'app-view-user-equipments',
  imports: [EquipmentDisplayComponent],
  templateUrl: './view-user-equipments.component.html',
  styleUrl: './view-user-equipments.component.css'
})
export class ViewUserEquipmentsComponent {
  equipments : EquipmentDisplay[] = [];
  isLoading = true;
  error : string | null = null;
  
  @Input() userId : number = 0;
  private equipmentService = inject(EquipmentService);
  
  ngOnInit(): void {
    this.loadUserEquipments();

  }

  loadUserEquipments() {
    this.equipmentService.getUserEquipments(this.userId)
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.equipments = [...result.body];
            this.isLoading = false;
          } 
          else {
            alert(result.message);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error('user profile error :', err);
          alert("An error occurred while getting user equipment");
          this.isLoading = false;
        }
      });

  }

}
