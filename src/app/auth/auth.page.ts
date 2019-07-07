import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';

import { AuthProvider } from '../providers/auth/auth';
import { decodeLaravelErrors } from '../functions/Helpers';

import { ToastController , IonicModule, NavController/*, NavParams,*/, AlertController, LoadingController, MenuController, Events } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  segment: string = "login";
  loading: any;
  loader:any;
  formLogin: any = {
    email: '',
    password: '',
  };
  formRegister: any = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  constructor(public navCtrl: NavController/*, public navParams: NavParams*/,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              private authService: AuthProvider,
              private router: Router,
              private  toastCtrl: ToastController,
              public events: Events) {
     // this.loading = this.loadingCtrl.create({message: 'Please wait ...'});

     }

     ionViewDidLoad() {
      this.checkAuthenticated();
    }

    async showLoader() {
      this.loader = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      this.loader.present();
    }
    
   async dismissLoader() {
    await  this.loader.dismiss();
    }

    async checkAuthenticated () {
      try {
        const isAuthenticated = await this.authService.checkIsAuthenticated();
        console.log(isAuthenticated);
        if ( isAuthenticated ) {
       // this.menuCtrl.enable(true);
          // this.navCtrl.navigateRoot(AuthPage);
          // this.navCtrl.insert(0,HomePage);
         // this.navCtrl.popToRoot();
        this.router.navigateByUrl('/tabs/tab3');

        }
      } catch (err) {
        console.log(err);
        const alert = await this.alertCtrl.create({ header: 'Error', message: 'Error on verify authentication info', buttons: ['Ok'] });
        alert.present();
      }
    }

     async toastTip( Message :  string ) {
      const toast =  await  this . toastCtrl . create ({
          message: Message ,
          duration: 2000 ,
          position: 'middle'
        });
      toast . present ();
    }

    async doLogin(data: any) {
  if (!data.email ) {
      this.toastTip(' Please fill in the username ');
      return ;
    }
  if (!data.password) {
      this.toastTip (' please fill in the password ');
      return ;
    }
  this.showLoader();
  

  this.authService.login(data)
        .then((response: any) => {
          
          this.authService.storeCredentials(response);
          this.events.publish('user:get');

          this.dismissLoader();

          setTimeout(() => {
            this.checkAuthenticated();
          //  this.events.publish('user:get');
           // this.events.publish('notification:get');
          }, 750);
        })
        .catch(err => {
this.dismissLoader();
console.log(err);
let alertmessage;

if ( err.status === 400 ) {
            alertmessage = `${err.error.hint}`;
// tslint:disable-next-line: triple-equals
          } else if (err.status == 401) {
            alertmessage = `${err.error.message}`;

          } else {
            alertmessage = err;
          }
          this.showAlert('Error', alertmessage );
         // this.dismissLoader();

        });
    }

   async doRegister()  {

      this.loading.present();
      this.authService.register(this.formRegister)
        .then((response: any) => {
          this.loading.dismiss();
          console.log(response);
          this.doLogin({
            email: this.formRegister.email,
            password: this.formRegister.password,
          });
        })
        .catch((err: any) => {
          let alertmessage;
          this.loading.dismiss();
  // tslint:disable-next-line: triple-equals
          if (err.status == 422) {
            const decodedErrors: any = decodeLaravelErrors(err);
            alertmessage = decodedErrors.errors.join('<br>');

          } else {
            alertmessage = 'Unknow error on register';
          }
          let alert =  this.alertCtrl.create({message: alertmessage, header: 'Error', buttons: ['Ok']});

         // alert.present();
        });
    }

    validateLoginData(data: any) {
      return true;
    }

  ngOnInit() {
  }


  async showAlert(title, msg) {
    const alert = await this.alertCtrl.create({header: title, subHeader: msg, buttons: ['Ok']});
    alert.present();
  }

 
}
