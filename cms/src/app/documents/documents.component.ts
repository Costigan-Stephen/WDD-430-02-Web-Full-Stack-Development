import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  
  constructor(private documentService: DocumentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent
    .subscribe( 
      (document: Document) => { this.selectedDocument = document; } 
    );
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedDocument = params['id'];
      }
    )
  }

}
