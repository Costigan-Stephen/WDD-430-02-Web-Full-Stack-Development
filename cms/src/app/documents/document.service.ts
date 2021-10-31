import {Injectable, EventEmitter, Output} from '@angular/core';
import { Subject } from 'rxjs';

import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  maxDocId: number;
  private documents: Document [] =[];
  private documentsListClone: Document [] =[];
  //documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.maxDocId  = this.getMaxId();
    this.documents = MOCKDOCUMENTS;
  }
   
  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }
  
  getDocuments(): Document[]{ 
    return this.documents.slice();
  }

  getDocument(id: string): Document { 
    for (const document of this.documents) 
      if (document.id === id) return document;
    return null;
  }

  deleteDocument(document: Document): void {
    if (!document) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    
    this.documents.splice(pos, 1);
    this.documentsListClone = this.documents.slice()
    this.documentChangedEvent.next(this.documents.slice());
  }

  
  addDocument(newDocument: Document): void {
    if (!newDocument) return;

    this.maxDocId++;
    newDocument.id = this.maxDocId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) return;

    const position = this.documents.indexOf(originalDocument);
    if (position < 0) return;
    
    newDocument.id = originalDocument.id;
    this.documents[position] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }
}