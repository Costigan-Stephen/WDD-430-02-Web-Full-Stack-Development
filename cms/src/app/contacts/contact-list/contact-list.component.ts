import { Component, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // styles only contained in this component. Might use later
})
export class ContactListComponent implements OnInit {
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contacts) => this.contacts = contacts.slice());
  }

  // onSelected(contact: Contact): void { 
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

}
