import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class resourcesProvider {

    constructor(public http: HttpClient, private storage: Storage) {
    }
  



async getResources()
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.access_token}`,
    });
  return this.http.get(`${Service.apiUrl}/resources/categoryItemsAjax`, { headers }).toPromise();

}
async getResourcesBySlug(slug:any)
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/resources/categoryItemsAjaxByslug/${slug}`, { headers }).toPromise();

}



}