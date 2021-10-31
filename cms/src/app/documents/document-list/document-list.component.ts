import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  //@Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  // id: string, name: string, description: string, url: string, children: Document[]
  subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe((documents) => this.documents = documents.slice())
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList: Document[]) => this.documents = documentsList.slice());
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}