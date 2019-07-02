import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class notificationProvider {

    constructor(public http: HttpClient, private storage: Storage) {
    }
  



async getnotificationscount()
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.access_token}`,
    });
  return this.http.get(`${Service.apiUrl}/casts/getNotificationscount`, { headers }).toPromise();

}
async getnotifications()
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.access_token}`,
    });
  return this.http.get(`${Service.apiUrl}/casts/getNotifications`, { headers }).toPromise();

}

async getNotificationView(nid: number)
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.access_token}`,
    });
  return this.http.get(`${Service.apiUrl}/casts/getNotificationView/${nid}`, { headers }).toPromise();

}
async clearNotification()
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.access_token}`,
    });
  return this.http.get(`${Service.apiUrl}/casts/deleteNotifications`, { headers }).toPromise();

}

}