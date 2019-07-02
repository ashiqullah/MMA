import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Events,IonContent   } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../providers/language/language.service';
import { LanguageModel } from '../models/language.model';
import {UserProvider} from '../providers/user/user';
import {homeProvider} from '../providers/Home/home';
import { Service } from '../settings/Laravel';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  segment: string = "News";
  sliderdata: any[];
  news: any[];
  ServerUrl: string;
  Newsimage: string;
  Eventimage: string;
  mode: string = 'card';

  currenlanguage;
  loading: boolean = false;
  slideOpt = {
    loop: true,
    autoplay:true
  };

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public languageService: LanguageService,
    private userService: UserProvider,
    private homeservice: homeProvider,
    public events: Events,
    

  ) {
    events.subscribe('language:changed', (language) => {
      this.sliderdata = [];
      this.news = [];
      if(language =='fa')
      {
        language='da';
        this.currenlanguage='da';
      }
      else{
        this.currenlanguage=language;
      }
      this.homeservice.getSlider(language).then((repsonse: any) => {
        
        console.log(repsonse);
        this.sliderdata = repsonse.slider;
        this.news = repsonse.News;
        this.content.scrollToTop(1500);
   
       });
    });

    this.listenEvents();
    this.sliderdata = [];
    this.Newsimage=Service.newsImageUrl;
    this.Eventimage=Service.eventImageUrl;
    this.news = [];
    this.ServerUrl = Service.url;
    this.currenlanguage=this.translate.currentLang;
    if(this.translate.currentLang =='fa')
    {
      this.currenlanguage='da';
    }

  }

  listenEvents(){
    this.events.subscribe('reloadHomepage',() => {
      this.news = [];
      this.getNews();

     //call methods to refresh content
    });
 }

 

  ngOnInit() {

    this.loading = true;
    this.userService.getUserInfo().then((response: any) => {
      console.log(response);
      this.userService.storeUserInfo({id: response.id, name: response.name, user_type: response.user_type});
    });

    this.homeservice.getSlider(this.currenlanguage).then((repsonse: any) => {

      this.sliderdata = repsonse.slider;
      this.news = repsonse.News;
      this.loading = false;
      console.log(repsonse);
  
     });
  }
getNews()
{
  this.loading = true;
  this.homeservice.getSlider(this.currenlanguage).then((repsonse: any) => {

   
    this.news = repsonse.News;
    this.loading = false;
 
    console.log(this.news);
    

   });

}

  makelist(){
    this.mode = 'list';
  }

  makecard(){
    this.mode = 'card';
  }
  detail(item){
/*     , {
      item:item
    } */
    this.navCtrl.navigateForward(`/news/${item.id}`);
  }

  pulished(vtype,newsid,i)
  {
console.log(newsid);

  }
  

  loadMoreNews(event) {
    //  let last: any = this.comments[this.comments.length - 1];
      let lastid= Math.min.apply(Math,this.news.map(s => s.id));
      console.log(lastid);
      this.homeservice.getMoreNews(this.currenlanguage,lastid).then((response: any) => {
        console.log(response);
        this.news = this.news.concat(response);
       // event.complete();
        event.target.complete();
    
      });
    }
}
