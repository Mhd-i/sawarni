import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostObject } from '../objects/PostObject';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost/sawarni/getPosts.php';

  private http = inject(HttpClient);

  constructor() { }

  getPosts() : Observable<PostObject[]> {
    return this.http.get<PostObject[]>(this.apiUrl);
  }


}
