import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomPage } from './welcom.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomPageRoutingModule {}
