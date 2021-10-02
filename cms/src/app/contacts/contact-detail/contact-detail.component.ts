import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // styles only contained in this component
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteClick(){

  }
  onEditDetails(){
    
  }

}
