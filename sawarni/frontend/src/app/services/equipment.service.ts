import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = 'http://localhost/sawarni/equipment/';
  
  private http = inject(HttpClient);

  getAllEquipmentDisplays() : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'getAllEquipmentDisplays.php', null);
  }

  addEquipment(formData : FormData) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'addEquipment.php', formData);
  }
}
