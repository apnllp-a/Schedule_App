import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IonLoaderService } from 'src/app/ion-loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public loadingController: LoadingController, private ionLoaderService: IonLoaderService, private alertController: AlertController, private route: Router) { }

  ngOnInit() {
  }


 loading_login() {
    this.loadingController.create({
     message: 'กำลังโหลดข้อมูล...',
     duration: 3000,
     cssClass: 'loader-css-class',
     // backdropDismiss: true
   }).then( (res) => {
     res.present();
     this.route.navigate(['/tabs'])
   });

 }

}
