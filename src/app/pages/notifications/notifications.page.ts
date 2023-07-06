import { Component,Input,OnInit,ViewEncapsulation } from '@angular/core';
import { Location } from "@angular/common";
import { StorageService } from 'src/app/_services/storage.service';
import { notifiCations } from 'src/app/models/notifications/notifications.model';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NotificationsPage implements OnInit {

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
  
  tabSlot:string | undefined;
  currentUser: any;

  notifi_!: notifiCations[]; 
  itemCheck!:any ;
  disCheckitem!:boolean;
  url!: string;
  id_noti!:string;

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
  
  constructor(location: Location,private storageService: StorageService,private notification:NotificationService) {
    this.url = location.path();
  // Split the url using "/"
  const parts = this.url.split("/");
  // Get the desired substring
  const substring = parts[5]; // Assuming you want the third segment of the URL
  this.id_noti =substring;
  }
  ngOnInit(): void {
    this.retrieveNotifications()
      console.log(this.id_noti);
  }


  retrieveNotifications(): void {
    this.notification.getByID(this.id_noti)
      .subscribe({
        next: (data) => {
              // this.notification.get(this.id_noti).subscribe({
              //   next: (data2) => {
                  this.getBynotifiCations = data;
              //     console.log(this.getBynotifiCations)
              //   }
              // })
          // this.notifi_ = data;
          // this.itemCheck = data.length;

          if (this.itemCheck > 0 ) {
            if (this.currentUser.id != this.id_noti) {
              this.disCheckitem = false;
            }
          }
          console.log(this.getBynotifiCations)
          // console.log(this.itemCheck)
        },
        error: (e) => console.error(e)
      });
  }


}
