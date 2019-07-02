import { Component, OnInit } from '@angular/core';
import { notificationProvider } from '../providers/notifications/notification';
import {Events, ModalController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import {ArticlePage} from '../article/article.page';
import { TranslateService } from '@ngx-translate/core';
import { Service } from '../settings/Laravel';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  ServerUrl: string;
  Maleimage: string;
  Femaleimage: string;
  notifcations: any[];
  constructor(
    private notificationservice: notificationProvider,
    public events: Events,
    public router: Router,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    public translateService: TranslateService,
    private menu: MenuController,
    public translate: TranslateService




  ) {

    this.ServerUrl = Service.url;
    this.Maleimage = Service.maleImageUrl;
    this.Femaleimage = Service.femaleImageUrl;
    this.notificationservice.getnotifications().then((response: any) => {

this.notifcations = response;
console.log(response);
    });
   }

  async itemclicked(itemid, entity_type, entity_id, index) {

    this.notificationservice.getNotificationView(itemid).then((reponse: any) => {
      this.events.publish('Notification:viewed', reponse);
    });
    this.notifcations.splice(index, 1);

    /* if (entity_type === 'casts') {
      this.router.navigate(['/video-details']);

    } else if (entity_type === 'forum') {
      this.router.navigate(['/forum']);

    } */
    

    let modal = await this.modalController.create({
      component: ArticlePage,
      componentProps: { articleid: entity_id }
    });
    modal.present();
   }
   clearNotifications() {
     this.notificationservice.clearNotification().then((response: any)=>{
       this.notifcations=[];
      this.events.publish('Notification:viewed', 0);

     });
   }


 async  done() {
  const alert =await this.alertCtrl.create({
      header: this.translateService.instant('ALERT'),
      message: this.translateService.instant('CLEARALLNOTIFICATIONS'),
      buttons: [
        {
          text:this.translateService.instant('CANCEL')
        },
        {
          text: this.translateService.instant('YES'),
          handler: data => {
            this.clearNotifications();
          }
        }
      ]
    });
  alert.present();
  }


  ngOnInit() {
    this.menu.enable(true, 'logout');
    this.menu.enable(false, 'first');
  }

}
