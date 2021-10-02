import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model';
@Component({
  selector: 'cms-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})

export class MessagesListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'a', 'Hey!', 'Bro. Jackson'),
    new Message('2', 'b', 'Oh, Hey!', 'Steve Johnson'),
    new Message('3', 'c', 'I just realized this site had a message board!', 'Bro. Jackson'),
    new Message('4', 'd', 'Yeah it\'s pretty cool, I saw it the other day, but hadn\'t used it yet', 'Mark Smith'),
    new Message('5', 'e', 'Nice!', 'Bro. Jackson')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
