import { Component , ViewChild } from '@angular/core';

import { Platform , MenuController , NavController, AlertController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthProvider } from '../app/providers/auth/auth';
import { Router } from '@angular/router';
import { ArticleProvider } from '../app/providers/Forum/article';
import { ForumPage } from '../app/forum/forum.page';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserProvider } from './providers/user/user';
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/view';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import { notificationProvider } from './providers/notifications/notification';
import { Service } from './settings/Laravel';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(NavController) nav: NavController;
  rootPage: any = '/auth';
  catagories: any[];
  userlanguage: string; 
  textDir = 'ltr';
  currenlanguage ;
  user: any;
  ServerUrl: string;
    Maleimage: string;
    Femaleimage: string;

  constructor(
    private platform: Platform,
    public translate: TranslateService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthProvider,
    private menuCtrl: MenuController,
    private router: Router,
    private articleService: ArticleProvider,
    private navCtrl: NavController,
    private userService: UserProvider,
    private oneSignal: OneSignal,
    private alertCtlr: AlertController,
    public events: Events,
    private notificationservice: notificationProvider,



  ) {
    this.ServerUrl = Service.url;
    this.Maleimage = Service.maleImageUrl;
    this.Femaleimage = Service.femaleImageUrl;
  

    events.subscribe('Userprofile:changed', (newprofile) => {
            this.user = newprofile;
     });
     events.subscribe('user:get', (result) => {
     this.getUser();
});
events.subscribe('notification:get', (result) => {
 this.getNotifications()
});





    this.userService.getUserLanguage().then((result) => {
      if (result){
      translate.setDefaultLang(result);
      translate.use(result);
    }
    else{
      translate.setDefaultLang('en');
      translate.use('en');

    }
      
    }).catch(error => {
      // handle error

    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this is to determine the text direction depending on the selected language
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.textDir = (event.lang == 'ps' || event.lang == 'fa') ? 'rtl' : 'ltr';
        document.documentElement.dir = this.textDir;

      });
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    if (this.platform.is('cordova')) {
   this.setupPush();
    }
    this.authService.checkIsAuthenticated().then((result: boolean) => {

    if (result) {
     // this.Allcatagories();
     this.getUser();
      this.getNotifications();

    } else {
      this.router.navigateByUrl(this.rootPage);
        }

  });


  }

  setupPush() {
    this.oneSignal.startInit('d94b82dd-717b-48f4-9350-8ee25eeca68f', '800295638910');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
  

    this.oneSignal.handleNotificationReceived().subscribe(data => {

      const title = data.payload.title;
      const msg = data.payload.body;
      const additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);

    });

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      let additionalData = data.notification.payload.additionalData;
      this.showAlert('notification opend', 'you already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtlr.create({header: title, subHeader: msg, buttons: [{text: `Action: ${task}`, handler: () => {}}]});
    alert.present();
  }
  logout() {

    this.authService.removeCredentials();
    this.userService.removeUserInfo();
    this.userService.removeUserLanguage();

    setTimeout(() => {
      this.menuCtrl.enable(false);
      // this.router.navigateByUrl(this.rootPage);
      document.location.href = 'index.html';
    }, 750);
  }



 getNotifications()
 {
  this.notificationservice.getnotificationscount().then((resposnse: any) => { 
  this.events.publish('Notification:viewed', resposnse);
  });

 }
 

  getUser ()
  {
    this.userService.getUserInfo()
      .then((response: any) => {
        this.user = response;
        console.log(response);
      })
      .catch(err => {
        this.showAlert('Error', 'Error on get user info', null);
      
      })
  }

 
}
