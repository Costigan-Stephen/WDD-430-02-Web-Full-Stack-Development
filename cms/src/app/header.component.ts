import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() navEmitterEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onNavSelect(navEmitter: string): void {
    this.navEmitterEvent.emit(navEmitter);
  }
}
