import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../providers/language/language.service';
import { LanguageModel } from '../models/language.model';
import { UserProvider } from '../providers/user/user';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {
  languageSelected: any ;
  languages: Array<LanguageModel>;
  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public languageService: LanguageService,
    private userService: UserProvider,
    public events: Events,
  ) { 
    this.languages = this.languageService.getLanguages();
    this.userService.getUserLanguage().then((result) => {
     this.languageSelected=result;
     this.setLanguage();
    }).catch(error=>{
      //handle error

    });

    
  }
  setLanguage(){
    let defaultLanguage = this.translate.getDefaultLang();
    if (this.languageSelected){

      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
      this.userService.storeUserLanguage(this.languageSelected);
    this.events.publish('language:changed',this.languageSelected);

    } else {
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }
  }

  ngOnInit() {
  }

}
