import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';
import { Message } from '../messages.model';
@Component({
  selector: 'cms-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})

export class MessagesListComponent implements OnInit {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages) => this.messages = messages.slice());
    this.subscription = this.messageService.messageChangedEvent.subscribe((messageList: Message[])=> this.messages = messageList.slice());
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }

  ngOnDestroy(): void { this.subscription?.unsubscribe(); }

}
