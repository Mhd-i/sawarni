import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgFor],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  message = '';
  messages : any[] = [];

  conversationWithUserId! : number;

  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.conversationWithUserId = Number(params['userId']);
    });

    this.messageService.connect('ws://localhost:8081');
    
    this.messageService.messages$.subscribe(msg => {
      this.messages.push(msg.body);
    });
  }

  send() : void {
    if (this.message.trim()) {
      this.messageService.sendMessage({type : 'message',
                                       action : 'create',
                                       body : {
                                         senderid : Number(localStorage.getItem('loggedInUserId')),
                                         receiverid : this.conversationWithUserId,
                                         content : this.message
                                       }});
    }
  }
  
  
}
