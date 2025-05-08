import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = 'http://localhost/sawarni/api/equipment/';
  
  private http = inject(HttpClient);

  getAllEquipmentDisplays() : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'GetAllEquipmentDisplays.php', null);
  }

  addEquipment(equipment : any, files : File[]) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('name', equipment.name);
    formData.append('description', equipment.description);
    formData.append('price', equipment.price.toString());
    files.forEach(
      (file, index) => {
        formData.append(`file${index}`, file, file.name);
      }
    );
    return this.http.post<ApiResponse>(this.apiUrl + 'AddEquipment.php', formData);
  }
}
