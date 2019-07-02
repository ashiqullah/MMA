import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Service } from '../settings/Laravel';

@Component({
  selector: 'app-coalition-deputies',
  templateUrl: './coalition-deputies.page.html',
  styleUrls: ['./coalition-deputies.page.scss'],
})
export class CoalitionDeputiesPage implements OnInit {
  CoalitionDeputies:  any;
  ServerUrl: string;
  constructor(public navParams: NavParams,private modalController: ModalController) {
    this.ServerUrl = Service.url+'coalition_leaders/';
    this.CoalitionDeputies=[];
   }

  ngOnInit() {
    this.CoalitionDeputies = this.navParams.get('data');

  }

  dismiss() {
    this.modalController.dismiss();
}

}
