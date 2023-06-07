import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  
  tabSlot:string | undefined;

  friendCount=0;
  notificationCount=12;
  constructor() {}

}
