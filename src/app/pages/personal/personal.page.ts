import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { EventData } from 'src/app/_shared/event.class';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  mode_settingToggle = false;
  btn: string = 'true';
  public alertButtons = ['OK'];
  showpass = false;
  passToggleIcon = 'settings-outline';
  passToggleIconpass = 'eye';
  currentUser: any;
  content?: string;


  constructor(private router: Router,private alertController: AlertController,private storageService: StorageService,private eventBusService: EventBusService) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();

    
  }

  logout(){
    this.eventBusService.emit(new EventData('logout', null));
    this.router.navigate(['/login']); 
  }

  toggle_setting(): void {
    this.mode_settingToggle = !this.mode_settingToggle;
    if (this.mode_settingToggle == false) {
      this.btn = 'true';
      this.passToggleIcon = 'settings-outline';


    } if (this.mode_settingToggle == true) {
      this.btn = 'false';
      this.passToggleIcon = 'settings';
    }
    console.log(this.btn)
  }

  togglePass(): void {
    this.showpass = !this.showpass;

    if (this.passToggleIconpass == 'eye') {
      this.passToggleIconpass = 'eye-off'
    } else {
      this.passToggleIconpass = 'eye'
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'อัพเดตข้อมูลสำเสร็จ',
      subHeader: '',
      message: '',
      buttons: ['OK'],
    });
    this.btn = 'true';
    await alert.present();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'alert-buttons',
      header: 'คุณต้องการยกเลิกการเปลี่ยนแปลงหรือไม่ ?',
      // message: `<img src="../../../assets/images/logo-sch.png" width="100">
      // <br/>This is an alert message.`,
      buttons: [
        // {
        //   text: 'Open modal',
        //   cssClass: 'btns-modal-alert',
        //   handler: (blah) => {
        //     console.log('Confirm Cancel: blah');
        //   }
        // },
        {
          text: 'ไม่',
          role: 'cancel',
          cssClass: 'modal-button-cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.btn = 'false';
          }
        }, {
          text: 'ใช่',
          handler: () => {
            console.log('Confirm Okay');
            this.btn = 'true';
          }
        }
      ]
    });

    await alert.present();
  }


  async passAlert() {
    const alert = await this.alertController.create({
      header: 'Password',
      message: 'Confirm Password!',
      inputs: [{
        type:'password',
        placeholder: 'password (max 8 characters)',
        attributes: {
          maxlength: 8,
        },
      }],
      buttons: ['OK'],
    });

    await alert.present().then((res) => {
      if (alert.inputs) {
        this.toggle_setting()
        console.log(alert.inputs)
      }
    });;
  }



}
