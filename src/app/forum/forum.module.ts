import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { TranslateModule} from '@ngx-translate/core';



import { IonicModule } from '@ionic/angular';

import { ForumPage } from './forum.page';

const routes: Routes = [
  {
    path: '',
    component: ForumPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
   
    RouterModule.forChild(routes)
  ],
  declarations: [ForumPage, EscapeHtmlPipe],
})
export class ForumPageModule {}
