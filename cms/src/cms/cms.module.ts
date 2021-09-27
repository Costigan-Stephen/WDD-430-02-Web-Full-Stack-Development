import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CmsComponent } from './cms.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HeaderComponent } from './header.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';


@NgModule({
  declarations: [
    CmsComponent,
    ContactsComponent,
    HeaderComponent,
    ContactDetailComponent,
    ContactListComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [CmsComponent]
})
export class CmsModule { }
