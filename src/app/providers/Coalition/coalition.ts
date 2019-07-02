import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class CoalitionProvider {

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async getCoalition()
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/coalitions/getCoalitionsAjax`, { headers }).toPromise()
 
  }







}
