import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../messages.model';
import { Contact } from './../../contacts/contact.model';
import { ContactService } from './../../contacts/contact.service';
// import { environment } from 'src/environments/environment';
// import { HttpClient } from '@angular/common/http';
// import { MessageService } from '../message.service';

@Component({
  selector: 'cms-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.scss']
})
export class MessagesItemComponent implements OnInit{
  @Input() message: Message;
  
  messageSender: string;
  imagesrc: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
     const contact: Contact = this.contactService.getContact(this.message.sender);
     this.messageSender = contact?.name;
     this.imagesrc = contact?.imageUrl;
  }
}
