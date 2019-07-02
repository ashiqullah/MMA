import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Events } from '@ionic/angular';
import { AuthProvider } from '../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../settings/Laravel';
import { UserProvider } from '../providers/user/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  ServerUrl: string;
  Maleimage: string;
  Femaleimage: string;
  loader:any;
  file;
  form = this.fb.group({
    file: [null],
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    photo: [''],

});

  constructor(
    private authService: AuthProvider,
    private fb: FormBuilder,
    private alertCtlr: AlertController, 
    private loadingCtrl: LoadingController,
    private userService: UserProvider,
    private route: ActivatedRoute,
    public events: Events,
    
       ) {
        this.ServerUrl = Service.url;
        this.Maleimage = Service.maleImageUrl;
        this.Femaleimage = Service.femaleImageUrl;
   }

  ngOnInit() {
    //const userid: string = this.route.snapshot.queryParamMap.get('userid');
   // this.form.get('').setValue('');
   this.getUser();
  }


  postForm() {
    //   this.showLoader();
       const formData = new FormData();
     
       formData.append('name', this.form.value.name);
       formData.append('last_name', this.form.value.last_name);
       formData.append('email', this.form.value.email);
       formData.append('mobile', this.form.value.mobile);

       if (this.file){
       formData.append('photo', this.file);
      }
       this.authService.updateprofile(formData).then((response: any) => {
         console.log(response);
         this.user = response.currentprofile;
       //  this.dismissLoader();
         this.showAlert('Info',response.msg);
       }) .catch(err => {
        // this.dismissLoader();
        
         this.showAlert('error',err.error.message);
 
                 });
       this.events.publish('Userprofile:changed', this.user);

     }
     onFileChange(event) {
      if (event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          this.file = file;
    
      }
    }
    getUser ()
    {
      this.userService.getUserInfo()
        .then((response: any) => {
          this.user = response;
          this.form.get('name').setValue(response.name);
          this.form.get('last_name').setValue(response.last_name);
          this.form.get('email').setValue(response.email);
          this.form.get('mobile').setValue(response.mobile);
          this.form.get('photo').setValue(response.image);

          console.log(response);
        })
        .catch(err => {
        //  this.showAlert('Error','Error on get user info',null);
        
        })
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
