import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'document-page.page.html',
  styleUrls: ['document-page.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class Tab1Page {
  todayNumber: number = Date.now();
  currentFood = undefined;
  handleChange(ev:any) {
    this.currentFood = ev.target.value;
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
  constructor() {}

}
