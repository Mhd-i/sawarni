import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipmentDisplay } from '../interfaces/EquipmentDisplay';

interface ApiResponse<T> {
  ok: boolean;
  message: string;
  body: T;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  private baseUrl = 'http://localhost/sawarni/equipment/'; // ✅ adjust this to match your backend

  constructor(private http: HttpClient) {}

  // GET: All equipments
  getAllEquipmentDisplays(): Observable<ApiResponse<EquipmentDisplay[]>> {
    return this.http.post<ApiResponse<EquipmentDisplay[]>>(this.baseUrl + 'getAllEquipmentDisplays.php', null);
  }

  // GET: Equipments by user
  getUserEquipments(userId: string): Observable<ApiResponse<EquipmentDisplay[]>> {
    const params = new HttpParams().set('user_id', userId);
    return this.http.get<ApiResponse<EquipmentDisplay[]>>(`${this.baseUrl}/user`, { params });
  }

  // DELETE: Equipment
  deleteEquipment(formData: FormData): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.baseUrl}/delete`, formData);
  }
}
