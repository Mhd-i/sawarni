import { Component, inject, Input } from '@angular/core';
import { ContactDisplay } from '../../../interfaces/ContactDisplay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-display',
  imports: [],
  templateUrl: './contact-display.component.html',
  styleUrl: './contact-display.component.css'
})
export class ContactDisplayComponent {

  @Input() contact! : ContactDisplay;

  private router = inject(Router);

  changeContact() : void {
    this.router.navigate([`contact/${this.contact.id}`]);
  }

}
