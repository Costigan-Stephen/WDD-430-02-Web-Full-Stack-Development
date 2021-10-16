import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  @Input() selectedDocument: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

  onDeleteClick(){

  }
  onEditDetails(){
    
  }

  onViewClick(){
    
  }
}
