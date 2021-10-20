import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { CmsComponent } from './cms.component';
import { HeaderComponent } from './header.component';
// CONTACTS
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
// DOCUMENTS
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
// MESSAGES
import { MessagesComponent } from './messages/messages.component';
import { MessagesItemComponent } from './messages/messages-item/messages-item.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { MessagesEditComponent } from './messages/messages-edit/messages-edit.component';
// DIRECTIVES
import { DropDownDirective } from './shared/dropdown.directive';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'messages', component: MessagesComponent },
  {path: 'documents', component: DocumentsComponent },
  {path: 'documents/:id', component: DocumentItemComponent },
  {path: 'contacts', component: ContactListComponent },
  {path: 'contacts/:id', component: ContactItemComponent }
];

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [CmsComponent]
})
export class CmsModule { }
