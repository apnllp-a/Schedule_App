import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonModal } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';
import { UserAll } from 'src/app/models/user/user-all.model';
import { UserAllService } from 'src/app/services/user/user-all.service';
import { Item } from './types';
import { OverlayEventDetail } from '@ionic/core/components';
import { notifiCations } from 'src/app/models/notifications/notifications.model';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { StorageService } from 'src/app/_services/storage.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'document-page.page.html',
  styleUrls: ['document-page.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab1Page implements OnInit {
  todayNumber: number = Date.now();
  currentFood = undefined;
  user_all!: UserAll[];
  notifi_!: notifiCations[];
  currentUser: any;
  idFormselcet:any;
   fName:any;
   lName:any;
   notificationGet!: notifiCations[];

  getBynotifiCations: notifiCations = {
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

  handleChange(ev: any) {
    this.currentFood = ev.target.value;
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      window.location.reload();
    }, 1000);
  };
  constructor(private actionSheetCtrl: ActionSheetController,private alertController: AlertController, private storageService: StorageService,private notification: NotificationService, private authService: AuthService, public formBuilder: FormBuilder, private router: Router, private userAllService: UserAllService) { }
  ngOnInit() {
    this.retrieveUserAlls();
    this.currentUser = this.storageService.getUser();
    this.retrieveNotifications();
    console.log(this.currentUser)
  }
  retrieveUserAlls(): void {
    this.userAllService.getAll()
      .subscribe({
        next: (data) => {
          this.user_all = data;
          console.log(this.user_all)


        },
        error: (e) => console.error(e)
      });
  }

  retrieveUserByID(id:any): void {
    this.userAllService.get(id)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.fName = data.firstname;
          this.lName = data.lastname;
        },
        error: (e) => console.error(e)
      });
  }

  currentTutorial: UserAll = {};
  currentIndex = -1;
  firstname = '';

  searchName(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.userAllService.findByName(this.firstname)
      .subscribe({
        next: (data) => {
          this.user_all = data;
          console.log(this.user_all);

        },
        error: (e) => console.error(e)
      });
  }


  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | undefined;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.retrieveUserByID(this.name);

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
      console.log(this.name)
      this.idFormselcet = this.name;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }



  alert_text_save:any;

  refresher_input(){
    this.getBynotifiCations.type_doc = '';
    this.getBynotifiCations.desc = '';
    this.name = '';
  }


  save_noti(): void {
    const data = {
      type_doc: this.getBynotifiCations.type_doc,
      title: this.getBynotifiCations.type_doc,
      desc: this.getBynotifiCations.desc,
      user_send: this.currentUser.username,
      send_id: this.currentUser.id,
      // boss_name: this.getBynotifiCations.boss_name,
      // boss_id: this.getBynotifiCations.boss_id,
      // hr_name: this.getBynotifiCations.hr_name,
      // hr_id: this.getBynotifiCations.hr_id,
      // user_send_name: this.getBynotifiCations.user_send_name,
      user_send_id: this.name,

    };
    if (this.getBynotifiCations.type_doc == '') {
      console.log('เลือกประเภทก่อน')
      this.alert_text_save = 'ยังไม่ได้เลือกประเภทเอกสาร'
      
    }
    if (this.getBynotifiCations.desc == '' ) {
      console.log('เพิ่มรายก่อน')
      this.alert_text_save = 'ยังไม่ได้เพิ่มเนื้อหาของเอกสาร'
    }
    if (this.name == '' || this.name == null) {
      console.log('เพิ่มคนก่อน')
      this.alert_text_save = 'ยังไม่ได้กำหนดผู้รับ'
     
    }

    if (this.name == '' || this.name == null && this.getBynotifiCations.desc == '' && this.getBynotifiCations.type_doc == '') {
      console.log('เพิ่มข้อมูล')
      this.alert_text_save = 'กรุณากำหนดรายละเอียดเอกสาร'
      
    }
    this.presentAlert()

    
    this.notification.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          // if (this.submitted == true) {
          //   // this.router.navigate(['/']);
          //   console.log(res + 'success')
          //   //  this.h3_alert = 'สมัครสมาชิกสำเร็จ'
          //   //  this.p_alert = 'ไปหน้า Login เพื่อเข้าสู่ระบบ'
          //   //  กรุณาตรวจสอบข้อมูลอีกครั้ง
          //   this.presentAalert()
          // }
        },
        error: (e) => console.error(e)
      });
    return;

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ส่งไม่สำเร็จ',
      // subHeader: 'Important message',
      message:  this.alert_text_save,
      buttons: ['OK'],
    });

    await alert.present();
  }

  retrieveNotifications(): void {
    this.notification.getAll()
      .subscribe({
        next: (data) => {
              // this.notification.get(this.id_noti).subscribe({
              //   next: (data2) => {
              data;
              this.notificationGet = data;
              //     console.log(this.getBynotifiCations)
              //   }
              // })
          // this.notifi_ = data;
          // this.itemCheck = data.length;

         
          console.log(this.notificationGet)
          // console.log(this.itemCheck)
        },
        error: (e) => console.error(e)
      });
  }


  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }




  async presentActionSheet(id:any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.deleteDoc(id)
            // this.reloadPage();
          }
        },
        {
          text: 'ดูรายละเอียด',
        
          data: {
            action: 'share',
          },
          handler: () => {
           this.gotoDoc(id)
            // this.reloadPage();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  deleteDoc(id:any):void{
    this.notification.delete(id).subscribe({
      next: (res) =>{
        console.log(res)
        // window.location.reload();
      },
      error: (e) => console.error(e)
    });

  }

  gotoDoc(id:any):void{
    this.notification.get(id).subscribe({
      next: (res) =>{
        console.log(res)
        window.location.href = '';
        // window.location.reload();
      },
      error: (e) => console.error(e)
    });

  }

}
