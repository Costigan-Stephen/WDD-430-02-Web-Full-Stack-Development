import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CmsComponent } from './cms.component';
import { HeaderComponent } from './header.component';
// CONTACTS
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';


@NgModule({
  declarations: [
    CmsComponent,
    ContactsComponent,
    HeaderComponent,
    ContactDetailComponent,
    ContactListComponent,
    ContactItemComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [CmsComponent]
})
export class CmsModule { }
