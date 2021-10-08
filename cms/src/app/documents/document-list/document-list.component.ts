import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  // id: string, name: string, description: string, url: string, children: Document[]
  documents: Document[] = [
    new Document('CS 235-01', 'Designing Data Structures',       'Fall Semester - 2021, Undergraduate Program, 3.0 Credit(s)', 'https://my.byui.edu/ICS/Academics/', []),
    new Document('CS 246-01', 'Software Design and Development', 'Fall Semester - 2021, Undergraduate Program, 3.0 Credit(s)', 'https://my.byui.edu/ICS/Academics/', []),
    new Document('CS 432-02', 'Software Engineering III	',       'Fall Semester - 2021, Undergraduate Program, 3.0 Credit(s)', 'https://my.byui.edu/ICS/Academics/', []),
    new Document('WDD 430-02', 'Web Full-Stack Development',     'Fall Semester - 2021, Undergraduate Program, 3.0 Credit(s)', 'https://my.byui.edu/ICS/Academics/', []),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(document: Document): void {
    this.selectedDocumentEvent.emit(document);
  }

}
