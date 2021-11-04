import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // styles only contained in this component
})
export class ContactDetailComponent implements OnInit {
  // @Input() contact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];

  constructor(private contactService: ContactService, 
              private router:         Router, 
              private route:          ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => {
      this.groupContacts = [];
      this.contact = this.contactService.getContact(params.id)
      
      if (this.contact?.group && this.contact?.group?.length > 0) 
          this.groupContacts = this.contact?.group;
    });
  }

  onDeleteClick(){
    if (this.contact) {
      this.contactService.deleteContact(this.contact);
      this.router.navigate(['/contacts']);
    }
  }



}
