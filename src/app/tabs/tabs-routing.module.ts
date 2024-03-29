import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../pages/document-page/document-page.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),

      },
      {
        path: 'tab3',
        children: [
          { path: '', loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule) },
          { path: 'notifications/mess/:id', loadChildren: () => import('../pages/notifications/notifications.module').then(m => m.NotificationsPageModule) }
        ],

      },
      {
        path: 'tab4',
        loadChildren: () => import('../pages/personal/personal.module').then(m => m.PersonalPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
