import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { CoalitionProvider } from '../providers/Coalition/coalition';
import { Service } from '../settings/Laravel';
import { ModalController } from '@ionic/angular';
import {CoalitionDetailsPage} from "../coalition-details/coalition-details.page";
import {CoalitionDeputiesPage} from "../coalition-deputies/coalition-deputies.page"
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-coalitions',
  templateUrl: './coalitions.page.html',
  styleUrls: ['./coalitions.page.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class CoalitionsPage implements OnInit {
    loading: boolean = false;
    coalitions: any[];
    ServerUrl: string;
    Maleimage: string;
    Femaleimage: string;
    nullresouceimage:string;

    constructor(private coalationservic: CoalitionProvider,public modalController: ModalController,  public translate: TranslateService) {
        this.coalitions = [];
        this.ServerUrl = Service.url;
    this.Maleimage = Service.maleImageUrl;
    this.Femaleimage = Service.femaleImageUrl;

    this.nullresouceimage='upload/resources/resource.PNG';
    }

    ngOnInit() {
        this.loading = true;
        this.coalationservic.getCoalition().then((response: any) => {
      this.loading = false;
      this.coalitions = response;
        

        });
  }

 async openCoalitionDetails(CoalitionData){
    let modal = await this.modalController.create({component:CoalitionDetailsPage,componentProps: { data: CoalitionData}});
    modal.present();
}
async openCoalitionDeputies(CoalitionData){
    let modal = await this.modalController.create({component:CoalitionDeputiesPage,componentProps: { data: CoalitionData}});
    modal.present();
}

}
