import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coalition-details',
  templateUrl: './coalition-details.page.html',
  styleUrls: ['./coalition-details.page.scss'],
})
export class CoalitionDetailsPage implements OnInit {
  CoalitionDetails:  any;

  constructor(public navParams: NavParams,private modalController: ModalController,  public translate: TranslateService) { 
    this.CoalitionDetails=[];
  }

  ngOnInit() {
    this.CoalitionDetails = this.navParams.get('data');

  }
  dismiss() {
    this.modalController.dismiss();
}

}
