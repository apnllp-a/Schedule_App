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
import { tap } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
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
  ck_user_id: any;

  err_checkPass: boolean | undefined;

  name: String;
  position: String;
  department: String;
  address: String;
  phone: String;
  phone_iffice: String;
  age: String;

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

  constructor(private authService: AuthService,private Services: ServicesAllService, private router: Router, private alertController: AlertController, private storageService: StorageService, private eventBusService: EventBusService) {
    // Example usage




  }


  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser)
    this.retrieveUser()
  }



  // retrieveUser(): void {
  //   this.Services.getAll()
  //     .subscribe({
  //       next: (data) => {
  //         this.user_all = data;
  //         console.log(this.user_all)
  //         this.Services.get(this.currentUser.id).subscribe({
  //           next: (data2) => {
  //             this.currentDataUser = data2;
  //             this.ck_user_id == this.currentDataUser.user_id;
  //             console.log("ck_user_id:", this.ck_user_id);
  //           },
  //           error: (e) => console.error(e)
  //         });
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

 
  retrieveUser(): void {
    this.Services.getAll().subscribe({
      next: (data) => {
        this.user_all = data;
        for (let index = 0; index < this.user_all.length; index++) {
          const element = this.user_all[index];
         
          if (element.user_id == this.currentUser.id) {
            this.currentDataUser = element;
            console.log(this.currentDataUser);
          }
        }
        this.Services.get(this.currentUser.id).pipe(
          tap((data2) => {
            this.ck_user_id = this.currentDataUser.user_id;
          })
        ).subscribe({
          next: (data2) => {
            this.ck_user_id = data2.user_id;
            // Further processing that depends on this.ck_user_id
            this.name = data2.name!;
            this.position  = data2.position!;
            this.department = data2.department!;
            this.address = data2.address!;
            this.phone = data2.phone!;
            this.phone_iffice = data2.phone_iffice!;
            this.age = data2.age!;
           
            // Rest of your code
          },
          error: (e) => console.error(e)
        });
      },
      error: (e) => console.error(e)
    });
  }

  checkPass(id: string) {
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

  saveTutorial(e: any): void {
    const data = {
      'name': this.currentDataUser.name,
      'department': this.currentDataUser.department,
      'position': this.currentDataUser.position,
      'address': this.currentDataUser.address,
      'phone': this.currentDataUser.phone,
      'phone_iffice': this.currentDataUser.phone_iffice,
      'age': this.currentDataUser.age,
      'user_id': this.currentUser.id
    };

    if (data.user_id == e) {
      // console.log("Chang to Update")
      if (this.err_checkPass == true) {
        this.Services.update(this.UserID, data)
          .subscribe({
            next: (res) => {
              console.log(res);
              
              this.reloadPage();
            },
            error: (e) => console.error(e)
          });
      }
      if (this.err_checkPass == false) {
        console.log("Check One more !!")
        this.presentAlertPass()

      }
      if (this.err_checkPass == null) {
        this.presentAlertPass()
      }
    } else {
      this.Services.create(data).subscribe({
        next: (res) => {
          this.reloadPage();
        },
        error: (e) => console.log(e)
      });
      console.log('ARRR data !!')
    }
  }

  // saveTutorial(e:any): void {
  //   const data = {
  //     user_id: this.currentUser.id,
  //   };

  //   if (data.user_id == e) {
  //     if (this.err_checkPass == true) {
  //       if ( this.data_users.name) {
  //         Object.assign(data, { name: this.data_users.name });
  //         this.updateField('name', data);
  //       }
  //       if ( this.data_users.department) {
  //         Object.assign(data, { department: this.data_users.department });
  //         this.updateField('department', data);
  //       }
  //       if ( this.data_users.position) {
  //         Object.assign(data, { position: this.data_users.position });
  //         this.updateField('position', data);
  //       }
  //       if ( this.data_users.address) {
  //         Object.assign(data, { address: this.data_users.address });
  //         this.updateField('address', data);
  //       }
  //       if ( this.data_users.phone) {
  //         Object.assign(data, { phone: this.data_users.phone });
  //         this.updateField('phone', data);
  //       }
  //       if ( this.data_users.phone_iffice) {
  //         Object.assign(data, { phone_iffice: this.data_users.phone_iffice });
  //         this.updateField('phone_iffice', data);
  //       }
  //       if ( this.data_users.age) {
  //         Object.assign(data, { age: this.data_users.age });
  //         this.updateField('age', data);
  //       }
  //     } else if (this.err_checkPass == false) {
  //       console.log("Check One more !!");
  //       this.presentAlertPass();
  //     } else {
  //       console.log("No password check performed");
  //       this.presentAlertPass();
  //     }
  //   } else {
  //     console.log("Invalid user ID");

  //     const datanew = {
  //       name: this.data_users.name,
  //       department: this.data_users.department,
  //       position: this.data_users.position,
  //       address: this.data_users.address,
  //       phone: this.data_users.phone,
  //       phone_iffice: this.data_users.phone_iffice,
  //       age: this.data_users.age,
  //       user_id: this.currentUser.id
  //     };
  //     this.Services.create(datanew).subscribe({
  //       next: (res) => {
  //         console.log(res)
  //         this.reloadPage();
  //       },
  //       error: (e) => console.log(e)
  //     });
  //   }
  // }



  // updateField(field: string, data: any): void {
  //   this.Services.get(this.currentUser.id).subscribe({
  //     next: (res) => {
  //       const updatedData = { ...res, ...data }; // Merge existing data with the new field
  //       this.Services.update(this.currentUser.id, updatedData).subscribe({
  //         next: (res) => {
  //           console.log(`Updated ${field}:`, res);
  //           this.reloadPage();
  //         },
  //         error: (e) => console.error(e)
  //       });
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  // updateField(field: string, data: any): void {
  //   this.Services.update(this.currentUser.id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(`Updated ${field}:`, res);
  //         this.reloadPage();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }



  reloadPage(): void {
    window.location.reload();
  }

  // logout() {
  //   this.eventBusService.emit(new EventData('logout', null));
  //   this.router.navigate(['/login']);
  // }

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


  modelChangeFn(e) {
    // this.name
    // this.position
    // this.department
    // this.address
    // this.phone
    // this.phone_iffice
    // this.age
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


  logout(): void {
    this.authService.logout();
    this.storageService.clean()
    this.router.navigate(['/login']);
  }

}
