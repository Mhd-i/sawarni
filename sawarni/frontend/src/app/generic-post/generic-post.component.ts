import { Component, Input} from '@angular/core';
import { PostObject } from '../objects/PostObject';

@Component({
  selector: 'app-generic-post',
  imports: [],
  templateUrl: './generic-post.component.html',
  styleUrl: './generic-post.component.css'
})
export class GenericPostComponent{
  
  @Input() post! : PostObject;

}
