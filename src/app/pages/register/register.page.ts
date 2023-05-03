import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IonLoaderService } from 'src/app/ion-loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showpass = false;
  passToggleIcon = 'eye';

  constructor(public loadingController: LoadingController, private ionLoaderService: IonLoaderService, private alertController: AlertController, private route: Router) { }

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
      const alert = await  this.alertController.create({
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
      setTimeout(()=> alert.present(),4500);
    });

  }



}
