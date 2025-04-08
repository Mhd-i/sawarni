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

    // get user id
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) throw new Error('User not logged in');

    // create form data
    const formData = new FormData();
    formData.append('name', this.equipment.name);
    formData.append('description', this.equipment.description);
    formData.append('price', this.equipment.price.toString());
    formData.append('sellerId', localStorage.getItem('loggedInUserId') || '0');
    this.selectedFiles.forEach(
      (file, index) => {
        formData.append(`file${index}`, file, file.name);
      }
    );

    this.equipmentService.addEquipment(formData)
      .subscribe(
        (response) => {
          console.log('File Uploaded Successfully', response);
        },
        (error) => {
          console.error('Error Uploading File', error);
        }
  );;
    
    this.router.navigate(['/explore-page']);
  }

  onCancel() {
    this.router.navigate(['/explore-page']);
  }
}
