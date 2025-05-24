import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost/sawarni/api/messages/';

  private http = inject(HttpClient);

  getMessagesWith(otherUserId : number) : Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('otherUserId', otherUserId.toString());
    return this.http.post<ApiResponse>(this.apiUrl + 'GetMessagesWith.php', formData);
  }

  getRecentContacts() : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'GetRecentContacts.php', null);
  }

}
