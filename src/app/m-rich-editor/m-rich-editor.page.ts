import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from "@angular/common/http";
import { UploadAdapter} from '../providers/uploadAdapter/UploadAdapter';
import { Storage } from '@ionic/storage';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-m-rich-editor',
  templateUrl: './m-rich-editor.page.html',
  styleUrls: ['./m-rich-editor.page.scss'],
})
export class MRichEditorPage implements OnInit {
  public Editor = ClassicEditor;
  content: string;
  modalTitle: string;
  title: string;

  constructor(  private http: HttpClient , public storage: Storage, private modalController: ModalController,
    private navParams: NavParams) {

    this.content='<p>Hello, wold!</p>';
   }

  ngOnInit() {
    this.modalTitle = this.navParams.data.paramTitle;
    this.content = this.navParams.data.content;
    this.title = this.navParams.data.title;
  }

  onReady($event) {
    $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, '', this.http, this.storage);
    };
  }
  showvalue()
  {
    console.log(this.content);
  }
  async closeModal() {
    const onClosedData:any = {content:this.content,title:this.title};
    await this.modalController.dismiss(onClosedData);
  }
  dismiss() {
    this.modalController.dismiss();
}

/*   public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    console.log( data );
} */

}
