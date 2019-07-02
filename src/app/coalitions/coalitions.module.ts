import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';



import { CoalitionsPage } from './coalitions.page';

const routes: Routes = [
  {
    path: '',
    component: CoalitionsPage
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
    declarations: [CoalitionsPage]
})
export class CoalitionsPageModule {}
