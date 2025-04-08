import { Component, inject, OnInit } from '@angular/core';
import { EquipmentDisplayComponent } from '../../equipment-display/equipment-display.component';
import { EquipmentsService } from '../../../services/equipment.service';
import { ActivatedRoute } from '@angular/router';
import { EquipmentDisplay } from '../../../interfaces/EquipmentDisplay';

@Component({
  selector: 'app-equipments-view',
  standalone: true,
  imports: [EquipmentDisplayComponent],
  templateUrl: './equipments-view.component.html',
  styleUrl: './equipments-view.component.css'
})
export class EquipmentsViewComponent implements OnInit {

  /* ------------------------- Component State ------------------------- */
  equipments: EquipmentDisplay[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  displayOptions: string = 'all';
  user_id: string = '0';

  /* ------------------------- Dependency Injection ------------------------- */
  private readonly equipmentService = inject(EquipmentsService);
  private readonly route = inject(ActivatedRoute);

  /* ------------------------- Lifecycle Hooks ------------------------- */
  ngOnInit(): void {
    this.loadAllEquipments();
  }

  loadAllEquipments(): void {
    this.setLoadingState(true);

    this.equipmentService.getAllEquipmentDisplays()
      .subscribe({
        next: (result) => {
          if (result.ok) {
            this.equipments = result.body;
            this.setLoadingState(false);
          }
        },
        error: (err : any) => {
          console.error('error : ', err);
          this.setErrorState('failed to load equipments.');
        }
        
      });
  }

  loadUserEquipments(user_id: string): void {
    console.log('Loading user equipments for user:', user_id);
    // TODO: Implement user equipment loading
  }

  /* ------------------------- Response Handlers ------------------------- */
  private handleEquipmentResponse(result: any): void {
    if (result.ok) {
      this.equipments = result.body;
      this.setLoadingState(false);
    } else {
      console.error('Error retrieving equipments:', result.message);
      this.setErrorState('Failed to load equipments.');
    }
  }

  private handleError(err: any): void {
    this.setErrorState('Failed to load.');
    console.error('Error Handling Equipments:', err);
  }

  /* ------------------------- State Management ------------------------- */
  private setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.error = null;
  }

  private setErrorState(errorMessage: string): void {
    this.error = errorMessage;
    this.isLoading = false;
  }
}