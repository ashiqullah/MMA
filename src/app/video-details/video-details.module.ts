import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VideoDetailsPage } from './video-details.page';

import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { TranslateModule} from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: VideoDetailsPage
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
  declarations: [VideoDetailsPage]
})
export class VideoDetailsPageModule {}
