import { Component,Input,OnInit,ViewEncapsulation } from '@angular/core';

import { Location } from "@angular/common";
import { StorageService } from 'src/app/_services/storage.service';
import { notifiCations } from 'src/app/models/notifications/notifications.model';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { NavController, Platform } from '@ionic/angular';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NotificationsPage implements OnInit {
  
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
  pdfObj : any;

  todayNumber: number = Date.now();
  currentFood = undefined;
  handleChange(ev:any) {
    this.currentFood = ev.target.value;
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
  
  tabSlot:string | undefined;
  currentUser: any;

  notifi_!: notifiCations[]; 
  itemCheck!:any ;
  disCheckitem!:boolean;
  url!: string;
  id_noti!:string;

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
  
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener,location: Location,private storageService: StorageService,private notification:NotificationService) {
    this.url = location.path();
  // Split the url using "/"
  const parts = this.url.split("/");
  // Get the desired substring
  const substring = parts[5]; // Assuming you want the third segment of the URL
  this.id_noti =substring;
  }
  ngOnInit(): void {
    this.retrieveNotifications()
      console.log(this.id_noti);
  }


  retrieveNotifications(): void {
    this.notification.getByID(this.id_noti)
      .subscribe({
        next: (data) => {
              // this.notification.get(this.id_noti).subscribe({
              //   next: (data2) => {
                  this.getBynotifiCations = data;
              //     console.log(this.getBynotifiCations)
              //   }
              // })
          // this.notifi_ = data;
          // this.itemCheck = data.length;

          if (this.itemCheck > 0 ) {
            if (this.currentUser.id != this.id_noti) {
              this.disCheckitem = false;
            }
          }
          console.log(this.getBynotifiCations)
          // console.log(this.itemCheck)
        },
        error: (e) => console.error(e)
      });
  }



  // createPdf() {
  //   const pdfBlock: any = document.getElementById('print-wrapper');
  //   const options = {
  //     background: 'white',
  //     height: pdfBlock.clientWidth,
  //     width: pdfBlock.clientHeight,
  //   };
  //   domtoimage
  //     .toPng(pdfBlock, options)
  //     .then((fileUrl) => {
  //       var doc = new JSPDF('p', 'mm', 'a4');
  //       doc.addImage(fileUrl, 'PNG', 10, 10, 240, 180);
  //       let docRes = doc.output();
  //       let buffer = new ArrayBuffer(docRes.length);
  //       let array = new Uint8Array(buffer);
  //       for (var i = 0; i < docRes.length; i++) {
  //         array[i] = docRes.charCodeAt(i);
  //       }
  //       const directory = this.file.dataDirectory;
  //       const fileName = 'user-data.pdf';
  //       let options: IWriteOptions = {
  //         replace: true,
  //       };
  //       this.file
  //         .checkFile(directory, fileName)
  //         .then((res) => {
  //           this.file
  //             .writeFile(directory, fileName, buffer, options)
  //             .then((res) => {
  //               console.log('File generated' + JSON.stringify(res));
  //               this.fileOpener
  //                 .open(this.file.dataDirectory + fileName, 'application/pdf')
  //                 .then(() => console.log('File is exported'))
  //                 .catch((e) => console.log(e));
  //             })
  //             .catch((error) => {
  //               console.log(JSON.stringify(error));
  //             });
  //         })
  //         .catch((error) => {
  //           this.file
  //             .writeFile(directory, fileName, buffer)
  //             .then((res) => {
  //               console.log('File generated' + JSON.stringify(res));
  //               this.fileOpener
  //                 .open(this.file.dataDirectory + fileName, 'application/pdf')
  //                 .then(() => console.log('File exported'))
  //                 .catch((e) => console.log(e));
  //             })
  //             .catch((error) => {
  //               console.log(JSON.stringify(error));
  //             });
  //         });
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

  createPdf() {
    var docDefinition = {
      content: [
        { text: this.getBynotifiCations.type_doc, style: 'header' },
        { text:  this.getBynotifiCations.updatedAt, alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'To', style: 'subheader' },
        this.letterObj.to,
 
        { text: this.getBynotifiCations.desc, style: 'story', margin: [0, 20, 0, 20] },
 
        // {
        //   ul: [
        //     'Bacon',
        //     'Rips',
        //     'BBQ',
        //   ]
        // }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment:'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
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
 
}
