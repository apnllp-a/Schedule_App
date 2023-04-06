import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'document-page.page.html',
  styleUrls: ['document-page.page.scss']
})
export class Tab1Page {
  todayNumber: number = Date.now();
  
  
  
  constructor() {}

}
