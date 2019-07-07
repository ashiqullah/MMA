import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule} from '@ngx-translate/core';
import { ResurcesPage } from './resurces.page';
import { TimeagoModule } from 'ngx-timeago';

const routes: Routes = [
  {
    path: '',
    component: ResurcesPage
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
  declarations: [ResurcesPage]
})
export class ResurcesPageModule {}
