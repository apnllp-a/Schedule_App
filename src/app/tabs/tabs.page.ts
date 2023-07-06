import { Component, Input } from '@angular/core';
import { NotificationService } from '../services/notifications/notification.service';
import { StorageService } from '../_services/storage.service';
import { notifiCations } from '../models/notifications/notifications.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  
  tabSlot:string | undefined;
  currentUser: any;

  UserID?: String;
  notifi_!: notifiCations[]; 
  itemCheck!:any ;
  disCheckitem!:boolean;

  @Input()  getBynotifiCations: notifiCations = {
    type_doc: '',
    title: '',
    desc: '',
    user_send: '',
    send_id: '',
    boss_name: '',
    boss_id: '',
    hr_name: '',
    hr_id: '',
    user_send_name: '',
    user_send_id: '',
    published: false
  };
  
  constructor(private storageService: StorageService,private notification:NotificationService) {}


  retrieveNotifications(): void {
    this.notification.getAll()
      .subscribe({
        next: (data) => {
          
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.user_send_id == this.currentUser.id) {
              this.UserID = element.user_send_id;
              console.log(this.UserID)
              this.notification.get(this.UserID).subscribe({
                next: (data2) => {
                  this.getBynotifiCations = data2;
                  console.log(this.itemCheck)
                  // console.log(this.getBynotifiCations)
                }
                
              })
            }
          }
          this.notifi_ = data;
          this.itemCheck = data.length;

          if (this.itemCheck > 0 ) {
            if (this.currentUser.id != this.UserID) {
              this.disCheckitem = false;
            }
          }
          console.log(this.notifi_)
          console.log(this.itemCheck)
        },
        error: (e) => console.error(e)
      });
  }

}
