import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { error } from 'console';
import { IonLoaderService } from 'src/app/ion-loader.service';
import { Tutorial } from 'src/app/models/tutorial.model';
import { UserAll } from 'src/app/models/user/user-all.model';
import { ServicesTestService } from 'src/app/services/services-test.service';
import { UserAllService } from 'src/app/services/user/user-all.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showpass = false;
  passToggleIcon = 'eye';
  ionicForm!: FormGroup;

  tutorial: Tutorial = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    position: '',
    email: '',
    published: false
  };
  submitted = false;
  h3_alert: string | undefined;
  p_alert: string | undefined;
  user_all!: UserAll[];
  user_all_length!: number;

  constructor(public formBuilder: FormBuilder,private userAllService: UserAllService, private tutorialService: ServicesTestService, public loadingController: LoadingController, private ionLoaderService: IonLoaderService, private alertController: AlertController, private route: Router) {
    this.retrieveUserAlls()
  }

  ngOnInit() {
  }

  // displayAutoLoader() {
  //   this.ionLoaderService.autoLoader();
  // }
  // showLoader() {
  //   this.ionLoaderService.simpleLoader();
  // }
  // hideLoader() {
  //   this.ionLoaderService.dismissLoader();
  // }
  // customizeLoader() {
  //   this.ionLoaderService.customLoader();
  // }

  getDate(e:any) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob')!.setValue(date, {
       onlyself: true
    })
 }

 submitForm() {
  console.log(this.ionicForm.value)
}


  retrieveUserAlls(): void {
    this.userAllService.getAll()
      .subscribe({
        next: (data) => {
          this.user_all = data;
          this.user_all_length = data.length;
          console.log(this.user_all)

        },
        error: (e) => console.error(e)
      });
  }

  save_Register(): void {
    const data = {
      username: this.tutorial.username,
      password: this.tutorial.password ,
      firstname: this.tutorial.firstname,
      lastname: this.tutorial.lastname,
      position: this.tutorial.position,
      email: this.tutorial.email
    };

    for (let index = 0; index < this.user_all_length; index++) {
      const element = this.user_all[index];
      if (element.username == data.username ) {
        console.log('username invalue');
        return;
      } else {
        this.tutorialService.create(data)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.submitted = true;
              if (this.submitted == true) {
                // this.router.navigate(['/']);
                console.log(res + 'success')
                //  this.h3_alert = 'สมัครสมาชิกสำเร็จ'
                //  this.p_alert = 'ไปหน้า Login เพื่อเข้าสู่ระบบ'
                //  กรุณาตรวจสอบข้อมูลอีกครั้ง
                this.presentAalert()
              }
            },
            error: (e) => console.error(e)
          });
        return;

      }
    }





  }




  togglePass(): void {
    this.showpass = !this.showpass;

    if (this.passToggleIcon == 'eye') {
      this.passToggleIcon = 'eye-off'
    } else {
      this.passToggleIcon = 'eye'
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'สมัครสมาชิกสำเสร็จ',
      subHeader: '',
      message: '',
      buttons: [{
        text: 'เข้าสู่ระบบ',
        handler: (blah) => {
          console.log('Confirm ');
          this.loadingController.create({
            message: 'กำลังบันทึกข้อมูล...',
            duration: 3000
          }).then((response) => {
            response.present();
            response.onDidDismiss().then((response) => {
              console.log('Loader dismissed', response);

              this.route.navigate(['/login'])
            });
          });

        }
      }],
    });

    await alert.present();
  }

  presentAalert() {
    this.loadingController.create({
      message: 'กำลังบันทึกข้อมูล...',
      duration: 4000,
      cssClass: 'loader-css-class',
      // backdropDismiss: true
    }).then(async (res) => {
      res.present();
      const alert = await this.alertController.create({
        header: 'สมัครสมาชิกสำเสร็จ',
        subHeader: '',
        message: '',
        buttons: [{
          text: 'เข้าสู่ระบบ',
          handler: (blah) => {
            console.log('Confirm ');
            this.route.navigate(['/login'])

          }
        }]
      })
      setTimeout(() => alert.present(), 4500);
    });

  }



}
