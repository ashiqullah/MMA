import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  loader:any;
  form = this.fb.group({
   
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmNewPassword: ['', Validators.required]

});

  constructor( private authService: AuthProvider,private fb: FormBuilder, private alertCtlr: AlertController,  private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  postForm() {
   //   this.showLoader();
      const formData = new FormData();
    
      formData.append('current_password', this.form.value.currentPassword);
      formData.append('newpassword', this.form.value.newPassword);
      formData.append('newpassword_confirmation', this.form.value.confirmNewPassword);
      this.authService.changePassword(formData).then((response: any) => {
        console.log(response);
      //  this.dismissLoader();
        this.showAlert('Info',response.msg);
      }) .catch(err => {
       // this.dismissLoader();
       
        this.showAlert('error',err.error.message);

                });
      
      
     /*  this.events.publish('reloadHomepage');
      this.navCtrl.pop(); */

    }
    async showAlert(title, msg) {
      const alert = await this.alertCtlr.create({header: title, subHeader: msg, buttons: ['Ok']});
      alert.present();
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


}
