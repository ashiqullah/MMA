import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  formReset: any = {
    email: '',
    message: '',
  };
  constructor( private  toastCtrl: ToastController, private authService: AuthProvider,) { }

  ngOnInit() {
  }
  async doReset(email: any) {
    if (!email ) {
        this.toastTip(' Please Enter  the Email ');
        return ;
      }

    this.authService.resetPassword(email)
        .then((response: any) => {
          console.log('sucess');
        
        })
        .catch(err => {
console.log(err);

        });
    }


    async toastTip( Message :  string ) {
      const toast =  await  this . toastCtrl . create ({
          message: Message ,
          duration: 2000 ,
          position: 'middle'
        });
      toast . present ();
    }

}
