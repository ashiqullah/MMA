import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.page.html',
  styleUrls: ['./editmodal.page.scss'],
})
export class EditmodalPage implements OnInit {

  modalTitle:string;
  Edititemtext:string;
  constructor(private modalController: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.modalTitle = this.navParams.data.paramTitle;
    this.Edititemtext = this.navParams.data.ItemText;
  }
  async closeModal() {
    const onClosedData: string = this.Edititemtext;
    await this.modalController.dismiss(onClosedData);
  }
  dismiss() {
    this.modalController.dismiss();
}

}
