import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

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
  subscription: Subscription;
  contacts: Contact[] = [];
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contacts) => this.contacts = contacts.slice());
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => this.contacts = contactsList.slice());
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }

}
