import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomPageRoutingModule } from './welcom-routing.module';

import { WelcomPage } from './welcom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomPageRoutingModule
  ],
  declarations: [WelcomPage]
})
export class WelcomPageModule {}
