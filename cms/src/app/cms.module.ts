import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CmsComponent } from './cms.component';
import { HeaderComponent } from './header.component';
// CONTACTS
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
// DOCUMENTS
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
// MESSAGES
import { MessagesComponent } from './messages/messages.component';
import { MessagesItemComponent } from './messages/messages-item/messages-item.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { MessagesEditComponent } from './messages/messages-edit/messages-edit.component';
// DIRECTIVES
import { DropDownDirective } from './shared/dropdown.directive';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './cms-routing.moule';

// SERVICES
import { AuthGuard } from './auth-guard.service';



@NgModule({
  declarations: [
    CmsComponent,
    ContactsComponent,
    HeaderComponent,
    ContactDetailComponent,
    ContactListComponent,
    ContactItemComponent,
    MessagesComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    DocumentItemComponent,
    MessagesItemComponent,
    MessagesListComponent,
    MessagesEditComponent,
    DropDownDirective,
    HomeComponent,
    DocumentEditComponent,
    ContactEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [CmsComponent]
})
export class CmsModule { }
