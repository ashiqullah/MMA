import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../forum/forum.module#ForumPageModule'
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: '../notifications/notifications.module#NotificationsPageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            // loadChildren: '../tab2/tab2.module#Tab2PageModule'
            loadChildren: '../casts/casts.module#CastsPageModule'
          }

        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            // loadChildren: '../tab3/tab3.module#Tab3PageModule'
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'Resources',
        children: [
          {
            path: '',
            // loadChildren: '../tab3/tab3.module#Tab3PageModule'
            loadChildren: '../resurces/resurces.module#ResurcesPageModule'
          }
        ]
        }
        ,
        {
            path: 'coalition',
            children: [
                {
                    path: '',
                    // loadChildren: '../tab3/tab3.module#Tab3PageModule'
                    loadChildren: '../coalitions/coalitions.module#CoalitionsPageModule'
                }
            ]
        },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
