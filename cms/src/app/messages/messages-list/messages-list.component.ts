import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../messages.model';
@Component({
  selector: 'cms-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})

export class MessagesListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (messages)=>this.messages = messages.slice()
    );
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }
}
