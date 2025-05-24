import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-recent-contacts',
  imports: [],
  templateUrl: './recent-contacts.component.html',
  styleUrl: './recent-contacts.component.css'
})
export class RecentContactsComponent implements OnInit {

  recentContacts : {'id' : number, 'username' : string, 'profilePicturePath' : string}[] = [];
  
  private messagesService = inject(MessageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadRecentContacts();
  }

  loadRecentContacts() {
    this.messagesService.getRecentContacts().subscribe({
      next: (response) => {
        if (response.ok) {
          this.recentContacts = response.body.recentContacts.slice(0, 5);
        }
        else {
          console.error(response.message);
        }
      },
      error: (err) => console.error('error getting recent contacts', err)
    });
  }

  onClickContact(userId : number) {
    this.router.navigate([`contact/${userId}`]);
  }

}
