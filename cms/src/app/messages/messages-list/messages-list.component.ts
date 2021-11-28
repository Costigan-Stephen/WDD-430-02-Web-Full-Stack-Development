import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

import { MessageService } from '../message.service';
import { Message } from '../messages.model';
@Component({
  selector: 'cms-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})

export class MessagesListComponent implements OnInit {
  messages: Message[] = [];
  contacts: Contact[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    console.log("Messages: "+this.messages);
    this.messageService.messageChangedEvent.subscribe((messages) => this.messages = messages.slice());
    
    //this.subscription = this.messageService.messageChangedEvent.subscribe((messageList: Message[])=> this.messages = messageList);
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }

  //ngOnDestroy(): void { this.subscription?.unsubscribe(); }

}
