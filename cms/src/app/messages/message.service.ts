import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Observer, Subject } from 'rxjs';

import {MOCKMESSAGES} from './MOCKMESSAGES';
import { Message} from './messages.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  @Output() messageChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  HTTP_URL = environment.apiURL + "/messages.json";

  private messages: Message [] = [];

  resolveAfter2Seconds(x: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }


  constructor(private HTTP: HttpClient) { 
    this.fetchPost();
    this.messageListChangedEvent.next(this.messages.slice());
  }

  fetchPost(){
    this.HTTP.get<Message[]>(this.HTTP_URL)
    .subscribe((messagesList: Message[]) => {
      this.messages = messagesList;
      this.messages.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
    },
    (error: any) => { console.log(error); });
  }

  getMessages(): Message[] { 
    return this.messages.slice();
  }

  getMessage(id: string): Message{ 
    if(!this.messages)
      this.messages = this.getMessages();
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getSender(id: string): Message{ 
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message): void {
    if (!message.msgText || !message.subject) 
      return;
    this.messages.push(message);
    this.storeMessages();
    this.messageChangedEvent.emit(this.messages.slice());
  }

  storeMessages(){
    const docsString = JSON.stringify(this.messages);
    const httpOptions = { 
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json' 
      }) 
    }
    this.HTTP.put<Message[]>(this.HTTP_URL, docsString, httpOptions)
      .subscribe(
        () => this.messageListChangedEvent.next(this.messages.slice()));
  }
}