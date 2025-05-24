import { Component, inject } from '@angular/core';
import { EquipmentDisplayComponent } from '../../content-displays/equipment-display/equipment-display.component';
import { EquipmentDisplay } from '../../../interfaces/EquipmentDisplay';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-equipment-view',
  imports: [EquipmentDisplayComponent],
  templateUrl: './equipment-view.component.html',
  styleUrl: './equipment-view.component.css'
})
export class EquipmentViewComponent {

  equipments : EquipmentDisplay[] = [];
  isLoading = true;
  error : string | null = null;
  displayOptions : string = 'all';
  user_id : string = '0';

  private equipmentService = inject(EquipmentService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      console.log(params.get('displayOptions'))
      this.displayOptions = params.get('displayOptions') || 'all';
      this.user_id = params.get('user_id') || '0';
    })
    this.loadEquipmentDisplays();
  }

  loadEquipmentDisplays() {
    switch (this.displayOptions) {
      case 'all':
        this.loadAllEquipmentDisplays();
        break;

    }
  }

  loadAllEquipmentDisplays() {
    this.isLoading = true;
    this.error = null;


    this.equipmentService.getAllEquipmentDisplays()
      .subscribe({
        next : (result) => {
          if (result.ok) {
            this.equipments = result.body;
            this.isLoading = false;
          }
          else {
            console.error('error retrieving posts : ', result.message);
            this.isLoading = false;
          }
        },
        error : (err) => {
          this.error = "failed to load.";
          this.isLoading = false;
          console.log("Error Handling Posts : ", err);
        }
      });
  }

}
