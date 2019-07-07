import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class UserProvider {
  userInfo: any;
  constructor(public http: HttpClient, private storage: Storage) {
  }

  async getUserInfo ()
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/user`, { headers }).toPromise();
  }


  async getUserProfile(profileId: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/users/profile/ajax/${profileId}`, { headers }).toPromise();
  }
  storeUserInfo(response: any) {

    this.storage.set('UserDetails', response);
  }
  getUser() {
    return this.storage.get('UserDetails').then(value => {
      this.userInfo = value;
      return this.userInfo;
    });
  }
  getUserPermissions() {
   return Promise.all([this.storage.get("Permissions"), this.storage.get("UserDetails")]).then(values => {  
      return values;
});



    /* return this.storage.get('Permissions').then(value => {
      return value;
    }); */
  }
  removeUserInfo() {
    this.storage.remove('UserDetails');
  }

  storeUserLanguage(language: any) {

    this.storage.set('lang', language);

  }
    getUserLanguage() {
      return this.storage.get('lang').then((val) => {
      return val;
   });
  }
  removeUserLanguage() {
    this.storage.remove('lang');
  }
  async getuserpermission()
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/user/getUserPermission`, { headers }).toPromise();
  }
  storePermission(response: any) {

    this.storage.set('Permissions', response);
  }
}
