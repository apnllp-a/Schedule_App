import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonModal } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';
import { UserAll } from 'src/app/models/user/user-all.model';
import { UserAllService } from 'src/app/services/user/user-all.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { notifiCations } from 'src/app/models/notifications/notifications.model';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { StorageService } from 'src/app/_services/storage.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

import { NavController, Platform } from '@ionic/angular';

import * as moment from 'moment';

import * as pdfMakeConfig from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMakeConfig.vfs  = pdfFonts.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';


@Component({
  selector: 'app-tab1',
  templateUrl: 'document-page.page.html',
  styleUrls: ['document-page.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab1Page implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput;
  selectedFile: File;
  previewImageUrl: string;

  todayNumber: number = Date.now();
  currentFood = undefined;
  user_all!: UserAll[];
  notifi_!: notifiCations[];
  currentUser: any;
  idFormselcet: any;
  fName: any;
  lName: any;
  notificationGet!: notifiCations[];
  check_doc = false;


  letterObj = {
    to: '',
    from: '',
    text: ''
  }

  pdfObj: any;

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

  @Input() getBynotifiCationsget: notifiCations = {
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

  handleRefreshDocument(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener, private actionSheetCtrl: ActionSheetController, private alertController: AlertController, private storageService: StorageService, private notification: NotificationService, private authService: AuthService, public formBuilder: FormBuilder, private router: Router, private userAllService: UserAllService) {



   }
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

  retrieveUserByID(id: any): void {
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



  alert_text_save: any;

  refresher_input() {
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
      this.presentAlert()
    }
    if (this.getBynotifiCations.desc == '') {
      console.log('เพิ่มรายก่อน')
      this.alert_text_save = 'ยังไม่ได้เพิ่มเนื้อหาของเอกสาร'
      this.presentAlert()
    }
    if (this.name == '') {
      console.log('เพิ่มคนก่อน')
      this.alert_text_save = 'ยังไม่ได้กำหนดผู้รับ'
      this.presentAlert()
    }

    if (this.name == '' || this.name == null && this.getBynotifiCations.desc == '' && this.getBynotifiCations.type_doc == '') {
      console.log('เพิ่มข้อมูล')
      this.alert_text_save = 'กรุณากำหนดรายละเอียดเอกสาร'
      this.presentAlert()

    }

    if (this.name != '' || this.name != null && this.getBynotifiCations.desc != '' && this.getBynotifiCations.type_doc != '') {
      console.log('เพิ่มข้อมูลเรียบร้อย')
      this.alert_text_save = 'เพิ่มข้อมูลเรียบร้อย'

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




  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ส่งไม่สำเร็จ',
      // subHeader: 'Important message',
      message: this.alert_text_save,
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

          for (let index = 0; index < this.notificationGet.length; index++) {
            const element = this.notificationGet[index];

            if (element.send_id != this.currentUser.id) {
              this.check_doc = true;
            }
            if (element.send_id == this.currentUser.id) {
              this.check_doc = false;
            }

          }
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




  async presentActionSheet(id: any) {
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
          text: 'Download PDF',

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

  deleteDoc(id: any): void {
    this.notification.delete(id).subscribe({
      next: (res) => {
        console.log(res)
        console.log('Delete success')
        window.location.reload();
      },
      error: (e) => console.error(e)
    });

  }

  gotoDoc(id: any): void {
    this.notification.getByID(id).subscribe({
      next: (res) => {
        console.log(res)
        this.getBynotifiCationsget = res;

        this.createPdf()
        // window.location.reload();
      },
      error: (e) => console.error(e)
    });

  }
  



  createPdf(): void{
    moment.locale('th');
    const test: string = moment(this.getBynotifiCationsget.updatedAt).format('Do MMMM YYYY');
    var accc = this.getBynotifiCationsget.type_doc;
    var full;
    if (accc == '0') {
       full = 'เอกสารการลา'
    }
    if (accc == '1') {
       full = 'เอกสารรายงาน'
    }
    if (accc == '2') {
       full = 'เอกสารการแลกเปลี่ยนเวร'
    }
    // Split the text into paragraphs
const paragraphs: string[] = this.getBynotifiCationsget.desc!.split('\n');

// Create an array to hold the formatted paragraphs
const formattedParagraphs: any[] = [];

// Apply indentation to each paragraph
paragraphs.forEach((paragraph: string) => {
    formattedParagraphs.push({
        text: paragraph,
        style: 'story',
        margin: [20, 0, 0, 0] // Adjust indentation as needed
    });
});

    
    pdfMakeConfig.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew-Bold.ttf',
        italics: 'THSarabunNew-Italic.ttf',
        bolditalics: 'THSarabunNew-BoldItalic.ttf'
        },
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      },
      

    }

    

    var docDefinition = {

      
      watermark: { text: 'SCHEDULE', fontSize: 72 ,color: '#769FCD',bold:true },
      // header: 'Schedule' ,color: '#769FCD',

      // footer: {
      //   columns: [
      //     'Schedule',
      //     { text: 'Schedule', alignment: 'right' ,color: '#769FCD'}
      //   ]
      // },
      // background: function(currentPage, pageSize) {
      //   return `page ${currentPage} with size ${pageSize.width} x ${pageSize.height}`
      // },
    
      pageMargins: [ 40, 60, 40, 60 ],
      content: [
        // {
        //   image: 'strawberries'
        // },
        
        { text: 'บันทึกเอกสาร', style: 'logo' },
        // { text: this.getBynotifiCationsget.type_doc, style: 'header' },
        // { text: test, alignment: 'right',fontSize:'18' },
        {
          text: [
              { text:'เรื่อง' , color: '#000' }, // Apply red color to this part of the text
              ' ' + full // Concatenate with the other part of the text
          ],
          style: 'subheader'
      },
        {
          text: [
              { text: 'เรียน', color: '#000' }, // Apply red color to this part of the text
              ' ' + this.getBynotifiCationsget.user_send_id // Concatenate with the other part of the text
          ],
          style: 'subheader'
      },
        

        { text: this.getBynotifiCationsget.desc, style: 'story'},

        // {text: 'จาก', style: 'subheadero' },
        // { text: this.getBynotifiCationsget.user_send, style: 'subheadero' },
        {
          columns: [
              { width: '*', text: '', style: 'subheadero', alignment: 'right' }, // Align to the right
              { width: '*', text:'จาก', style: 'subheadero', alignment: 'center' } // Center-align
          ]
      },
      {
          columns: [
              { width: '*', text: '', style: 'subheadero', alignment: 'right' }, // Align to the right
              { width: '*', text:  this.getBynotifiCationsget.user_send, style: 'subheadero', alignment: 'center' } // Center-align
          ]
      },
      {
          columns: [
              { width: '*', text: '', style: 'subheadero', alignment: 'right' }, // Align to the right
              { width: '*', text:  test, style: 'subheadero', alignment: 'center' } // Center-align
          ]
      },
        // {
        //   ul: [
        //     'Bacon',
        //     'Rips',
        //     'BBQ',
        //   ]
        // }
      ],
      
      
      defaultStyle: {
        font: 'THSarabunNew'
      },
      styles: {
        logo: {
          fontSize: 24,
          bold: true,
          alignment: 'center'
        },
        // header: {
        //   fontSize: 18,
        //   bold: true,
        // },
        subheader: {
          fontSize: 18,
          bold: true,
          // margin: [0, 15, 0, 0]
        },

        subheadero: {
          fontSize: 18,
          italic: true,
          // margin: [0, 15, 0, 0],
          // alignment: 'right'
        },
        story: {
          italic: true,
          // alignment: 'justify',
          width: '100',
          fontSize: 18,
          margin: [0, 20, 0, 20],
          textIndent: 50,

        }
      },

      // images: {
      //   strawberries: {
      //     url: 'https://picsum.photos/id/1080/367/267',
      //     headers: {
      //       myheader: '123',
      //       myotherheader: 'abc',
      //     }
      //   }
      // }
    }
    
    this.pdfObj = pdfMake.createPdf(docDefinition).download(full);
    this.downloadPdf()
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    // You can now use the selected file for further processing
  }
}
