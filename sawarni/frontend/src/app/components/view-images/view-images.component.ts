import { Component, inject, Inject, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Attachment } from '../../interfaces/Attachment';

@Component({
  selector: 'app-view-images',
  imports: [],
  templateUrl: './view-images.component.html',
  styleUrl: './view-images.component.css'
})
export class ViewImagesComponent {
  
  @Input() attachments : Attachment[] = [];
  displayedImageIndex : number = 1;

  displayNextAttachment() {
    this.displayedImageIndex++;
    if (this.displayedImageIndex >= this.attachments.length) {
      this.displayedImageIndex = 0;
    }
  }


}
