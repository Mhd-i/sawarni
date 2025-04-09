import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipments.component.html',
  styleUrls: ['./add-equipments.component.css'],
  imports: [FormsModule]
})
export class AddEquipmentComponent {
  equipment = {
    name: '',
    description: ''
  };
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.equipment.name);
    formData.append('description', this.equipment.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post('http://localhost/sawarni/equipment.php', formData).subscribe({
      next: (res) => {
        console.log('Equipment added:', res);
        this.onCancel(); // Reset form
      },
      error: (err) => {
        console.error('Upload error:', err);
      }
    });
  }

  onCancel() {
    this.equipment = { name: '', description: '' };
    this.selectedFile = null;
  }
}
