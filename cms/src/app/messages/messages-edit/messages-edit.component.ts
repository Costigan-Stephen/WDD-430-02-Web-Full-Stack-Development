import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from './../messages.model';

@Component({
  selector: 'cms-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.scss']
})

export class MessagesEditComponent implements OnInit {
  currentSender = '18';

  @ViewChild('subject', { static: true }) subject: ElementRef;
  @ViewChild('messageText', { static: true }) messageText: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();
  

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const id = new Date().getTime().toString();
    const newMessage = new Message(
      id, 
      this.subject.nativeElement.value, 
      this.messageText.nativeElement.value, 
      this.currentSender
    );
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.messageText.nativeElement.value = '';
  }
}
