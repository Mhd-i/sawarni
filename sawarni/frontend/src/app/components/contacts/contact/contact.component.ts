import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactDisplay } from '../../../interfaces/ContactDisplay';
import { MessageService } from '../../../services/message.service';
import { MessageWebsocketService } from '../../../services/message.websocket.service';
import { UserService } from '../../../services/user.service';
import { ContactDisplayComponent } from '../contact-display/contact-display.component';
import { MessageDisplay } from '../../../interfaces/MessageDisplay';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, ContactDisplayComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewChecked {
  
  writtenMessage = '';
  messages : MessageDisplay[] = [];
  contacts : ContactDisplay[] = [];

  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('otherpfp') otherPfP! : ElementRef;

  conversationWithUserId! : number;
  conversationWithUserProfilePicturePath : string = '';

  private messageWebsocketService = inject(MessageWebsocketService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  private paramSubscription: Subscription | undefined;

  loggedInUserId : number = 0;

  ngOnInit() {

    this.userService.getLoggedInUserId().subscribe({
      next: (response) => {
        if (response.ok) {
          this.loggedInUserId = response.body.id;
        }
        else {
          console.error(response.message);
        }
      },
      error : (error) => {
        console.error('Error retrieving user id', error);
      }

    });

    this.paramSubscription = this.route.params.subscribe(params => {
      this.conversationWithUserId = Number(params['userId']);
      this.messages = []; // Clear previous messages
      
      if (this.conversationWithUserId != 0) {
        this.loadOldMessages();
      }
    });

    this.route.params.subscribe(params => {
      this.conversationWithUserId = Number(params['userId']);
    });

    if (this.conversationWithUserId != 0) {
      this.loadOldMessages();
    }

    this.loadContacts();

    this.messageWebsocketService.connect('ws://localhost:8081');
    
    this.messageWebsocketService.messages$.subscribe(msg => {
      this.messages.push(msg.body);
    });

    this.userService.getUserProfile(this.conversationWithUserId).subscribe({
      next : (response) => {
        if (response.ok) {
          this.conversationWithUserProfilePicturePath = response.body.profilePicturePath;
        }
        else {
          console.error(response.message);
        }
      },
      error : (err) => {
        console.error('Error getting user profile picture : ', err);
      }
    })

  }

  loadContacts() {
    this.messageService.getRecentContacts().subscribe({
      next: (response) => {
        if (response.ok) {
          this.contacts = response.body.recentContacts;
          console.log('Loaded contacts:', this.contacts); // Add this line
        }
        else {
          console.error(response.message);
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  
    if (this.conversationWithUserProfilePicturePath) {
      this.otherPfP.nativeElement.src = this.conversationWithUserProfilePicturePath;
    }
  }
  
  scrollToBottom() {
    const element = this.messageContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  loadOldMessages() {
    this.messageService.getMessagesWith(this.conversationWithUserId).subscribe({
      next: (result) => {
        if (result.ok) {
          this.messages.push(...result.body.messages);
        }
        else {
          console.error(result.message);
        }
      },
      error: (err) => {
        console.error('Error Getting messages : ', err);
      }
    });
  }

  send() : void {
    if (this.writtenMessage.trim()) {
      this.messageWebsocketService.sendMessage({type : 'message',
                                       action : 'create',
                                       body : {
                                         receiverid : this.conversationWithUserId,
                                         content : this.writtenMessage
                                       }});
    }

    setTimeout(() => this.scrollToBottom(), 100);
    this.writtenMessage = '';
  }

  onProfileButtonClick() {
    this.router.navigateByUrl(`user-profile/${this.conversationWithUserId}`);
  }
  
}
