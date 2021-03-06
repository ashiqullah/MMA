import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';

import { IonicModule } from '@ionic/angular';

import { CastsPage } from './casts.page';

const routes: Routes = [
  {
    path: '',
    component: CastsPage
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
  declarations: [CastsPage]
})
export class CastsPageModule {}
