import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesAllService } from 'src/app/services/data_users/services-all.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { EventData } from 'src/app/_shared/event.class';
import { dataUsers } from 'src/app/models/data-users/data_users.model';
import { HttpHeaders } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
// Create an instance of HttpHeaders and set the desired headers


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
  user_all!: dataUsers[];
  user_all_length!: number;
  testid?: string;
  UserID?: String;
  passFormUser = '';

  err_checkPass:boolean | undefined;

  data_users: dataUsers = {
    name: '',
    department: '',
    position: '',
    address: '',
    phone: '',
    phone_iffice: '',
    age: '',
    user_id: '',
    published: false
  };


  @Input() currentDataUser: dataUsers = {
    name: '',
    department: '',
    position: '',
    address: '',
    phone: '',
    phone_iffice: '',
    age: '',
    user_id: '',
    published: false
  };

  constructor(private Services: ServicesAllService, private router: Router, private alertController: AlertController, private storageService: StorageService, private eventBusService: EventBusService) {
    // Example usage

    console.log(this.UserID)
    
    
  }


  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser)
    this.retrieveUser()
  }
  


  retrieveUser(): void {
    this.Services.getAll()
      .subscribe({
        next: (data) => {
          this.user_all = data;
          console.log(this.user_all)
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.user_id == this.currentUser.id) {
              this.UserID = element.user_id;
              this.Services.get(this.UserID).subscribe({
                next: (data2) => {
                  this.currentDataUser = data2;
                  // console.log(this.currentDataUser)
                }
              })

              // console.log(this.UserID)
            }
          }
        },
        error: (e) => console.error(e)
      });
  }

  checkPass(id:string){
    const userEnteredPassword = id; // Replace with the user's entered password
    const storedHashedPassword = this.currentUser.password; // Replace with the stored hashed password
    bcrypt.compare(userEnteredPassword, storedHashedPassword, (err, result) => {
      if (err) {
        console.log(err)
      } else if (result) {
        // Passwords match, perform the necessary actions
        this.err_checkPass = true;
        console.log('Password is correct');
        console.log(this.err_checkPass);
      } else {
        // Passwords do not match
        console.log('Password is incorrect');
        this.err_checkPass = false;
        console.log(this.err_checkPass);
      }
    });
  }

  saveTutorial(): void {
    const data = {
      name: this.data_users.name,
      department: this.data_users.department,
      position: this.data_users.position,
      address: this.data_users.address,
      phone: this.data_users.phone,
      phone_iffice: this.data_users.phone_iffice,
      age: this.data_users.age,
      user_id: this.currentUser.id
    };

    if (data.user_id == this.UserID) {
      // console.log("Chang to Update")
      if(this.err_checkPass == true ){
        this.Services.update(this.UserID, data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.reloadPage();
          },
          error: (e) => console.error(e)
        });
      }
      if (this.err_checkPass == false ) {
        console.log("Check One more !!")
        this.presentAlertPass()
        
      }
    } if (this.err_checkPass == null ) {
      this.presentAlertPass()
    }

  }
  reloadPage(): void {
    window.location.reload();
  }

  logout() {
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

  async presentAlertPass() {
    const alert = await this.alertController.create({
      header: 'กรุณากรอกรหัสผ่าน',
      subHeader: '',
      message: '',
      buttons: ['OK'],
    });
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
            this.reloadPage();
          }
        }
      ]
    });

    await alert.present();
  }


  async passAlert() {
    const alert = await this.alertController.create({
      header: 'ระบุข้อมูลโดยละเอียด',
      message: 'กรุณากรอกขอข้อมูลให้ถูกต้อง เพื่อความปลอดภัย  และความรวดเร็วในการทำงานของเจ้าหน้าที่',
      // inputs: [{
      //   type: 'password',
      //   placeholder: 'password (max 8 characters)',
      //   attributes: {
      //     maxlength: 8,
      //   },
      // }],
      buttons: ['ยืนยัน'],
    });

    await alert.present().then((res) => {
      if (alert.inputs) {
        this.toggle_setting()
        console.log(alert.inputs)
      }
    });;
  }



}
