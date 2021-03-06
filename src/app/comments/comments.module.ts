import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentsPage } from './comments.page';
import { TranslateModule} from '@ngx-translate/core';
import { TimeagoModule } from 'ngx-timeago';

const routes: Routes = [
  {
    path: '',
    component: CommentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes),
    TimeagoModule
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
