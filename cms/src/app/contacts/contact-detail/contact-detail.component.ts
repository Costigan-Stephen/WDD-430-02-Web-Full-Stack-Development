import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private contactService: ContactService, 
              private router:         Router, 
              private route:          ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.contact = this.contactService.getContact(params.id));
  }

  onDeleteClick(){
    if (this.contact) {
      this.contactService.deleteContact(this.contact);
      this.router.navigate(['/contacts']);
    }
  }

}
