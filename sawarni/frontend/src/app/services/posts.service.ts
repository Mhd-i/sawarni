import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDisplay } from '../interfaces/PostDisplay';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost/sawarni/';

  private http = inject(HttpClient);

  constructor() { }

  getPosts() : Observable<PostDisplay[]> {
    return this.http.get<PostDisplay[]>(this.apiUrl + 'getPostDisplays.php');
  }

  addPost(postFormData : FormData) {
    return this.http.post(this.apiUrl + 'addPost.php', postFormData)
      .subscribe(
        (response) => {
          console.log('File Uploaded Successfully', response);
        },
        (error) => {
          console.error('Error Uploading File', error);
        }
    );
  }

}
