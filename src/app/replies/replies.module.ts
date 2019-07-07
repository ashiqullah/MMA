import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RepliesPage } from './replies.page';
import { TranslateModule} from '@ngx-translate/core';
import { TimeagoModule } from 'ngx-timeago';

const routes: Routes = [
  {
    path: '',
    component: RepliesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    TimeagoModule,
    RouterModule.forChild(routes)

  ],
  declarations: [RepliesPage]
})
export class RepliesPageModule {}
