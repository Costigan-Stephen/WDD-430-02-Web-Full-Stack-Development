import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../contacts/contact.model';
import { MessageService } from './message.service';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
  }
}
