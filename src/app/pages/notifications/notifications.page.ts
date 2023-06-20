import { Component,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NotificationsPage  {

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
