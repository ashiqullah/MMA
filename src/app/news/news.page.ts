import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { homeProvider } from '../providers/Home/home';
import { TranslateService } from '@ngx-translate/core';
import { Service } from '../settings/Laravel';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  myId = null;
  art: any;
  currenlanguage;
  ServerUrl: string;
  constructor(private route: ActivatedRoute,private homeservice: homeProvider,  public translate: TranslateService,) { 
    this.currenlanguage=this.translate.currentLang;
    if(this.translate.currentLang=='fa')
    {
      this.currenlanguage='da';
    }
    this.ServerUrl = Service.url;
   
  }

  ngOnInit() {
    this.myId = this.route.snapshot.paramMap.get('myid');
    this.homeservice.getNews(this.currenlanguage,this.myId).then((response: any) => {
      
      this.art=response;   
      console.log(response);
     });

  }

}
