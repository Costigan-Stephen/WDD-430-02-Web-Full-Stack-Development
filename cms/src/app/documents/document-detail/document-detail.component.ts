import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  //@Input() selectedDocument: Document;

  selectedDocument: Document;
  nativeWindow: any;
  
  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService) {
      this.nativeWindow = windowRefService.getNativeWindow();
     }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.selectedDocument = this.documentService.getDocument(params.id));
  }

  onView(): void {
    if (this.selectedDocument.url) {
      this.nativeWindow.open(this.selectedDocument.url);
    }
  }

  onDelete(): void {
    this.documentService.deleteDocument(this.selectedDocument);
    this.router.navigate(['/documents']);
  }
}
