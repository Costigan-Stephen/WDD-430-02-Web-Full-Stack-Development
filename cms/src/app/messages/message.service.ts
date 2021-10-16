import { Injectable, EventEmitter, Output } from '@angular/core';
import {Message} from './messages.model';

import {MOCKMESSAGES} from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messages: Message [] = [];

  constructor() { 
    this.messages = MOCKMESSAGES;
  }
  getMessages(): Message[] { 
    return this.messages.slice();
   }

   getMessage(id: string): Message{ 
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}