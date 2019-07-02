import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class AuthProvider {

  isAuthenticated = false;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async checkIsAuthenticated() {
    const now = Date.now();
    const auth: any = await this.storage.get('auth');
  
    if (!!!auth) {
      return false;
    }
    if ( auth.expired_at <= now) {
      return false;
    }

    return true;
  }

  login(user: any) {
    const request = {
      grant_type: 'password',
      client_id: Service.passport.client_id,
      client_secret: Service.passport.client_secret,
      username: user.email,
      password: user.password,
    };

    return this.http.post(`${Service.url}/oauth/token`, request).toPromise();
  }

  register(user: any) {
    return this.http.post(`${Service.apiUrl}/register`, user).toPromise();
  }

  removeCredentials() {
    this.storage.remove('auth');
    this.storage.remove('UserDetails');
  }

  storeCredentials(response: any) {
    let expired_at = (response.expires_in * 1000) + Date.now();

    this.storage.set('auth', {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      expired_at
    });
  }

  async changePassword(formdata: FormData)
  {
    
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/User/updatePasswordajax`,formdata, { headers }).toPromise();
  }
  async updateprofile(formdata: FormData)
  {
    
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/User/updateProfileAjax`,formdata, { headers }).toPromise();
  }
}
