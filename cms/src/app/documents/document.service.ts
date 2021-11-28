import {Injectable, EventEmitter, Output} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {Document} from './document.model';
//import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  //HTTP_URL = environment.apiURL + "/documents.json";
  HTTP_URL = environment.LOCALURL + "documents";

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

    const position = this.documents.indexOf(document);
    if (position < 0) return;
    
    this.HTTP.delete(this.HTTP_URL + '/' + document.id)
      .subscribe(
        () => {
          this.documents.splice(position, 1);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
    // this.documents.splice(position, 1);
    // this.documentListChangedEvent.next(this.documents.slice());
  }

  
  addDocument(document: Document): void {
    if (!document) return;

     // make sure id of the new Document is empty
     document.id = '';

     const headers = new HttpHeaders({
       'Content-Type': 'application/json'
      });
 
     // add to database
     this.HTTP.post<{ 
       message: string, 
       newDocument: Document }>
       (this.HTTP_URL, document, { headers: headers })
       .subscribe(
         (responseData) => {
           // add new document to documents
           this.documents.push(responseData.newDocument);
           this.documentListChangedEvent.next(this.documents.slice());
         }
       );
    // this.maxDocId++;
    // newDocument.id = this.maxDocId.toString();
    // this.documents.push(newDocument);
    // this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) return;

    const position = this.documents.indexOf(originalDocument);
    if (position < 0) return;
    
    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.HTTP.put( this.HTTP_URL + "/" + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        () => {
          this.documents[position] = newDocument;
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );

    // newDocument.id = originalDocument.id;
    // this.documents[position] = newDocument;
    // this.storeDocuments();
  }

  // storeDocuments(){
  //   const docsString = JSON.stringify(this.documents);
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  //   this.HTTP.put<Document[]>(this.HTTP_URL, docsString, httpOptions)
  //     .subscribe(() => this.documentListChangedEvent.next(this.documents.slice()));
  // }

}