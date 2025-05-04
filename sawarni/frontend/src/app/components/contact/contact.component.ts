import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { MessageWebsocketService } from '../../services/message.websocket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewChecked {
  
  message = '';
  messages : any[] = [];

  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('otherpfp') otherPfP! : ElementRef;

  conversationWithUserId! : number;
  conversationWithUserProfilePicturePath : string = '';

  private messageWebsocketService = inject(MessageWebsocketService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

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

    this.route.params.subscribe(params => {
      this.conversationWithUserId = Number(params['userId']);
    });

    this.loadOldMessages();

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
    if (this.message.trim()) {
      this.messageWebsocketService.sendMessage({type : 'message',
                                       action : 'create',
                                       body : {
                                         receiverid : this.conversationWithUserId,
                                         content : this.message
                                       }});
    }

    setTimeout(() => this.scrollToBottom(), 100);
    this.message = '';
  }

  onProfileButtonClick() {
    this.router.navigateByUrl(`user-profile/${this.conversationWithUserId}`);
  }
  
}
