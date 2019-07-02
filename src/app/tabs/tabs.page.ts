import { Component } from '@angular/core';
import {Events } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  total: number;
  constructor(
    public events: Events  )
  {


    events.subscribe('Notification:viewed', (NCount) => {
    this.total = NCount;
    });
  }
}
