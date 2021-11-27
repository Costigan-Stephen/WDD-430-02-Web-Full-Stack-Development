import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Observer, Subject } from 'rxjs';

import {MOCKMESSAGES} from './MOCKMESSAGES';
import { Message} from './messages.model';
import { Contact } from '../contacts/contact.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  @Output() messageChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();

  contacts: Contact [] =[];
  //HTTP_URL  = environment.apiURL + "/messages.json";
  HTTP_URL = environment.LOCALURL + "messages";

  messages: Message [] = [];

  constructor(private HTTP: HttpClient) { 
    this.HTTP.get<Message[]>(this.HTTP_URL)
      .subscribe((messagesList: Message[]) => {
        this.messages = messagesList;
        this.messages.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        this.messageListChangedEvent.next(this.messages.slice());
      },
      (error: any) => { console.log(error); });
      //console.log(this.messages);
    // this.fetchPost();
    // this.messageListChangedEvent.next(this.messages.slice());
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
    for (const message of this.messages){
      if (message.id === id) return message;
    }
    return null;
  }

  getSender(id: string): Message{ 
    for (const message of this.messages){
      if (message.id === id) return message;
    }
    return null;
  }

  deleteMessage(message: Message): void {
    if (!message) return;

    const position = this.messages.indexOf(message);
    if (position < 0) return;
    
    this.HTTP.delete(this.HTTP_URL +'/' + message.id)
      .subscribe(
        () => {
          this.messages.splice(position, 1);
          this.messageListChangedEvent.next(this.messages.slice());
        }
      );
    // this.messages.splice(position, 1);
    // this.storeMessages();
  }

  addMessage(newMessage: Message): void {
    if (!newMessage.msgText || !newMessage.subject) 
      return;

      // make sure id of the new Document is empty
      newMessage.id = '';

     const headers = new HttpHeaders({
       'Content-Type': 'application/json'
      });
 
     // add to database
     this.HTTP.post<{ 
       message: string, 
       newMessage: Message }>
       (this.HTTP_URL, newMessage, { headers: headers })
       .subscribe(
         (responseData) => {
           // add new document to documents
           this.messages.push(responseData.newMessage);
           this.messageListChangedEvent.next(this.messages.slice());
         }
       );
    // this.messages.push(message);
    // this.storeMessages();
    // this.messageChangedEvent.emit(this.messages.slice());
  }

  // storeMessages(){
  //   const docsString = JSON.stringify(this.messages);
  //   const httpOptions = { 
  //     headers: new HttpHeaders({ 
  //       'Content-Type': 'application/json' 
  //     }) 
  //   }
  //   this.HTTP.put<Message[]>(this.HTTP_URL, docsString, httpOptions)
  //     .subscribe(
  //       () => this.messageListChangedEvent.next(this.messages.slice()));
  // }
}