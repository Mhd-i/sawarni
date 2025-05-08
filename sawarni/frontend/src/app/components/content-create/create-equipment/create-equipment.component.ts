import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-equipment',
  imports: [FormsModule],
  templateUrl: './create-equipment.component.html',
  styleUrl: './create-equipment.component.css'
})

export class CreateEquipmentComponent {
  
  selectedFiles: File[] = [];

  equipment = {
    'name' : '',
    'description' : '',
    'price' : 0.0
  }

  private router = inject(Router);
  private equipmentService = inject(EquipmentService);

  onFileSelected(event : any) {
    // add selected files to the selectedFiles array
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onUpload() {
    if (this.selectedFiles.length === 0) {
      alert('Please select atleast one file first');
      return;
    }

    this.equipmentService.addEquipment(this.equipment, this.selectedFiles)
      .subscribe(
        (response) => {
          if (response.ok) {
            console.log('File Uploaded Successfully', response);
            this.onCancel()
          }
          else {
            console.error(response.message);
          }
        },
        (error) => {
          console.error('Error Uploading File', error);
        }
      );
  }

  onCancel() {
    this.router.navigate(['/explore-page'], { queryParams: { refresh: Date.now() } });
  }
}
