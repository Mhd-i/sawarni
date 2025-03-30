import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  apiUrl = 'http://localhost/sawarni/';

  http = inject(HttpClient);

  addLike(user_id : number, post_id : number) {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('post_id', post_id.toString());
    
    return this.http.post(this.apiUrl + 'addLike.php', formData)
  }

  removeLike(user_id : number, post_id : number) {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('post_id', post_id.toString());

    return this.http.post(this.apiUrl + 'removeLike.php', formData);
  }

}
