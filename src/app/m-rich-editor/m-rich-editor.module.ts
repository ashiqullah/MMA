import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { IonicModule } from '@ionic/angular';

import { MRichEditorPage } from './m-rich-editor.page';

const routes: Routes = [
  {
    path: '',
    component: MRichEditorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CKEditorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MRichEditorPage]
})
export class MRichEditorPageModule {}
