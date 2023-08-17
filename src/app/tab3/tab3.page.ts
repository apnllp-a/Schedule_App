import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { notifiCations } from "src/app/models/notifications/notifications.model";
import { NotificationService } from "src/app/services/notifications/notification.service";
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { switchMap } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  fakeArray = new Array(20);
  notifi_!: notifiCations[]; 
  currentUser: any;
  UserID?: String;

  itemCheck!:any ;
  disCheckitem!:boolean;

  currentUsertest = { id: 'exampleId' };
  items = ['Item 1', 'Item 2', 'Item 3'];

  notifiCations: notifiCations = {
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


  constructor(private actionSheetController: ActionSheetController,private router: Router,private notification:NotificationService, private storageService: StorageService, private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    // console.log(this.currentUser)
    this.retrieveNotifications();
    // console.log(this.currentUser.id)
  
  }

  // retrieveNotifications(): void {
  //   this.notification.getAll().pipe(
  //     switchMap((data) => {
  //       this.notifi_ = data;
  //       this.itemCheck = data.length;
  
  //       const userSendIds = data
  //         .filter((element) => element.user_send_id === this.currentUser.id)
  //         .map((element) => element.user_send_id);
  
  //       return this.notification.get(userSendIds);
  //     })
  //   ).subscribe({
  //     next: (data2) => {
  //       this.getBynotifiCations = data2;
  //       console.log(this.getBynotifiCations)
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

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
                  console.log(data2)
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

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.reloadPage()
      event.target.complete();
    }, 500);
  };

  reloadPage(): void {
    window.location.reload();
  }


  ck_nt:boolean = false;
  result!: string;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  // async presentActionSheet() {
  //   const buttons = this.generateActionSheetButtons();
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Select an item',
  //     cssClass: 'custom-action-sheet',
      
  //     buttons: buttons,
  //   });

  //   await actionSheet.present();
  // }

  // generateActionSheetButtons() {
  //   const buttons = [];

  //   for (const item of this.items) {
  //     buttons.push({
  //       text: item,
  //       handler: () => {
  //         this.itemClicked(item);
  //       },
  //     });
  //   }

  //   buttons.push({
  //     text: 'Cancel',
  //     role: 'cancel',
  //   });

  //   return buttons;
  // }

  itemClicked(item: string) {
    console.log('Item clicked:', item);
    // Perform actions for the selected item
  }

  setResult(ev :any) {
    this.result = JSON.stringify(ev.detail, null, 2);
    console.log(this.result)
  }

}
