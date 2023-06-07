import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IonLoaderService } from 'src/app/ion-loader.service';
import { Tutorial } from 'src/app/models/tutorial.model';
import { UserAll } from 'src/app/models/user/user-all.model';
import { ServicesTestService } from 'src/app/services/services-test.service';
import { UserAllService } from 'src/app/services/user/user-all.service';
import { PassThrough } from 'stream';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user_all!: UserAll[];
  user_all_length!: number;
  username:string | undefined;
  email!: String;
  password!: String;
  
  constructor(private http:HttpClient ,private userAllService: UserAllService, private tutorialService: ServicesTestService,public loadingController: LoadingController, private ionLoaderService: IonLoaderService, private alertController: AlertController, private route: Router) { }

  ngOnInit() {
    const user = localStorage.getItem('User')
    if(user== null){
      this.route.navigateByUrl('/login',{replaceUrl:true})
    }

  }



login(){
  let credentials ={
    username:this.username,
    password:this.password
  }
  this.http.post('http://localhost:8081/login',credentials).subscribe(res=>{
    console.log(res)
  },error=>{
    console.log(error)
  })
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
