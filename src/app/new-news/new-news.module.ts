import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { IonicModule } from '@ionic/angular';

import { NewNewsPage } from './new-news.page';

const routes: Routes = [
  {
    path: '',
    component: NewNewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewNewsPage]
})
export class NewNewsPageModule {}
