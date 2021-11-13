import {Injectable, EventEmitter, Output} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  HTTP_URL = environment.apiURL + "/documents.json";

  maxDocId: number;
  private documents: Document [] =[];
  //private documentsListClone: Document [] =[];
  //documentSelectedEvent = new EventEmitter<Document>();

  constructor(private HTTP: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocId  = this.getMaxId();
    this.HTTP.get<Document[]>(this.HTTP_URL)
      .subscribe((documentsList: Document[]) => {
        this.documents = documentsList;
        this.maxDocId = this.getMaxId();
        this.documents.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => { console.log(error); });
      console.log(this.documents);
  }
   
  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) 
        maxId = currentId;
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
    this.storeDocuments();
  }

  
  addDocument(newDocument: Document): void {
    if (!newDocument) return;
    this.maxDocId++;
    newDocument.id = this.maxDocId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) return;

    const position = this.documents.indexOf(originalDocument);
    if (position < 0) return;
    
    newDocument.id = originalDocument.id;
    this.documents[position] = newDocument;
    this.storeDocuments();
  }

  storeDocuments(){
    const docsString = JSON.stringify(this.documents);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    this.HTTP.put<Document[]>(this.HTTP_URL, docsString, httpOptions)
      .subscribe(() => this.documentListChangedEvent.next(this.documents.slice()));
  }

}