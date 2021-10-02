import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent {
  navEmitter: string = 'documents';  //starting layout
  title = 'WeLearn CMS';

  viewSelect(navEmitter: string) {
    this.navEmitter = navEmitter;
  }
}
