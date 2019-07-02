import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class homeProvider {

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
async getSlider(languaid)
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.access_token}`,
    });
  return this.http.get(`${Service.apiUrl}/casts/homepage/${languaid}`, { headers }).toPromise();

}
async getMoreNews(languaid,lastNewsid: number)
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${auth.access_token}`,
  });
  return this.http.get(`${Service.apiUrl}/casts/homepageMore/${languaid}/${lastNewsid}`, { headers }).toPromise();
}

async getNews(languaid,Newsid: any)
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${auth.access_token}`,
  });
  return this.http.get(`${Service.apiUrl}/casts/GetNews/${languaid}/${Newsid}`, { headers }).toPromise();
}

async addnews(formdata: FormData)
{
  
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${auth.access_token}`,
  });
  return this.http.post(`${Service.apiUrl}/news/add`,formdata, { headers }).toPromise();
}
async updatenews(formdata: FormData)
{
  
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${auth.access_token}`,
  });
  return this.http.post(`${Service.apiUrl}/news/update`,formdata, { headers }).toPromise();
}
async getCategories()
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${auth.access_token}`,
  });
  return this.http.get(`${Service.apiUrl}/news/getdropdowndata`, { headers }).toPromise();
}


}