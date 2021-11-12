import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable, EventEmitter, Output} from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  HTTP_URL = environment.apiURL + "/contacts.json";

   private contacts: Contact [] =[];
   //private contactsListClone: Contact [] =[];

   maxContactId: number;

   constructor(private HTTP: HttpClient) {
      // this.contacts = MOCKCONTACTS;
      // this.maxContactId = this.getMaxId();
      this.HTTP.get<Contact[]>(this.HTTP_URL)
      .subscribe((contactList: Contact[]) => {
        this.contacts = contactList;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => { console.log(error); });
   }

   getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId)
        maxId = currentId; 
    }
    return maxId;
  }

  getContacts(): Contact[]{ 
    return this.contacts.slice();
  }

  getContact(id: string): Contact{ 
    for (const contact of this.contacts) 
      if (contact.id === id) 
        return contact;
    
    return null;
  }

  deleteContact(contact: Contact): void {
    if ( !contact ) return; 

    const pos = this.contacts.indexOf(contact);
    if ( pos < 0 ) return; 

    this.contacts.splice(pos, 1);
    this.storeContacts();
    //this.contactsListClone = this.contacts.slice()
    //this.contactChangedEvent.emit(this.contacts.slice());
  }

  addContact(newContact: Contact): void {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    //this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) return;
    
    const position = this.contacts.indexOf(originalContact);
    if (position < 0) return;
    
    newContact.id = originalContact.id;
    this.contacts[position] = newContact;
    this.storeContacts();
    //this.contactListChangedEvent.next(this.contacts.slice());
  }

  storeContacts(){
    const docsString = JSON.stringify(this.contacts);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    this.HTTP.put<Document[]>(this.HTTP_URL, docsString, httpOptions)
      .subscribe(() => this.contactListChangedEvent.next(this.contacts.slice()));
  }
}