import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ContactItemComponent } from "./contacts/contact-item/contact-item.component";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
import { DocumentItemComponent } from "./documents/document-item/document-item.component";
import { DocumentsComponent } from "./documents/documents.component";
import { HomeComponent } from "./home/home.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from './auth-guard.service';
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactsComponent } from "./contacts/contacts.component";

const appRoutes: Routes = [
    //{path: '', component: DocumentsComponent },
    { path: '', redirectTo: '/documents', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },

    //{path: 'messages', canActivate: [AuthGuard], component: MessagesComponent }, // This is temporarily added to show authorization checking
    {path: 'documents',   component: DocumentsComponent, children: [
      {path: 'new',       component: DocumentEditComponent },
      {path: ':id',       component: DocumentDetailComponent },
      {path: ':id/edit',  component: DocumentEditComponent }
    ]},

    {path: 'contacts',    component: ContactsComponent, children: [
      {path: 'new',       component: ContactEditComponent },
      {path: ':id',       component: ContactDetailComponent },
      {path: ':id/edit',  component: ContactEditComponent }
    ]},
  
    {path: '**', component: HomeComponent }, // NOT FOUND - ADD LATER
  ];

@NgModule ({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}