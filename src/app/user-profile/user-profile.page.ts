import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Service } from '../settings/Laravel';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  @Input() value: number;
  passedvalue: number;
  userprofile: any[];
  ServerUrl: string;
  constructor(
    public modalController: ModalController,
    private authService: AuthProvider,
    private userService: UserProvider
  ) {
      this.passedvalue = this.value;
      this.ServerUrl = Service.url;
      this.userprofile = [];

   }
   close() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.getUserprofile(this.value);

  }

  // async ionViewCanEnter () {
  //   let isAuthenticated = await this.authService.checkIsAuthenticated();
  //   return isAuthenticated;
  // }

  // ionViewDidLoad() {
  //   this.getUser();
  // }

  getUserprofile(profileId: number)
  {
    // this.loading = true;
    this.userService.getUserProfile(profileId)
      .then((response: any) => {
        // this.loading = false;
        this.userprofile = response;
        console.log(response);
      })
      .catch(err => {
        /* this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present(); */
      });
  }

}
