import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class CastingProvider {

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async getVideos()
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/casts/videosData`, { headers }).toPromise()
 

  }
 
  async getMoreVideos(lastCastId: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/casts/videosDataLoadMore/${lastCastId}`, { headers }).toPromise()
  }

  async getRefreshData(lastCastId: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/casts/videosDataRefresh/${lastCastId}`, { headers }).toPromise()
  }


async loadSingleVideo(VideoID: number)
{
  let auth: any = await this.storage.get('auth');
  let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.access_token}`,
    });
  return this.http.get(`${Service.apiUrl}/casts/loadCastAjax/${VideoID}`, { headers }).toPromise();

}

async castComment(castid: number, commentMessage: string)
  {
    let postData = {
      cast_id: castid,
      comment: commentMessage
};
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/casts/ajaxaddComment`, postData, { headers }).toPromise();
  }

  async castCommentUpdate(commentID: number, commentMessage: string)
  {
    let postData = {
      id: commentID,
      comment: commentMessage
};
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/casts/updateCommentajax`, postData, { headers }).toPromise();
  }

  async DeleteVideoComment(commentID: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${auth.access_token}`,
      });
    return this.http.get(`${Service.apiUrl}/casts/deleteCommentajax/${commentID}`, { headers }).toPromise();
  
  }
  async saveCast(formdata: FormData)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${auth.access_token}`,
      });
    return this.http.post(`${Service.apiUrl}/casts/insertvideoajax`,formdata, { headers }).toPromise();
  
  }
  async getGroups()
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${auth.access_token}`,
      });
    return this.http.get(`${Service.apiUrl}/casts/getGroupajax`, { headers }).toPromise();
  
  }




}
