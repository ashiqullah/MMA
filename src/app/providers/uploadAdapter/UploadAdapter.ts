import { HttpParams, HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class UploadAdapter {
  auth: any;
    constructor(
      private loader,
      public url: string,
      private http: HttpClient,
      private storage: Storage
      ) {
    }

    uploadFile(file, url?: string, user?: string){
      let name = '';
      let formData: FormData = new FormData();
     /*  let headers = new Headers();
      name = file.name;
      formData.append('file', file, name);
      const dotIndex = name.lastIndexOf('.');
      const fileName  = dotIndex > 0 ? name.substring(0, dotIndex) : name;
      formData.append('name', fileName);
      formData.append('source', user);
  
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json'); */
      formData.append('file', file);
      let headers: HttpHeaders = new HttpHeaders({
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdiYzU4MTg4OGEyODE4YWNkOTMwZWQwMjFmMzNkNGE2ZjkyOGJlNTQyZTcwOTFlNjI1YjYwNWRmMmYwYWZiYThmODIzZTUyZDM3ODJmNjdkIn0.eyJhdWQiOiIxIiwianRpIjoiN2JjNTgxODg4YTI4MThhY2Q5MzBlZDAyMWYzM2Q0YTZmOTI4YmU1NDJlNzA5MWU2MjViNjA1ZGYyZjBhZmJhOGY4MjNlNTJkMzc4MmY2N2QiLCJpYXQiOjE1NjAwOTM5MjEsIm5iZiI6MTU2MDA5MzkyMSwiZXhwIjoxNTkxNzE2MzIxLCJzdWIiOiIzNTM0Iiwic2NvcGVzIjpbXX0.pPnoHenUCu0FNIskIe-0OGlwk9xCull8vKER8BFigdx_WYhiBdGrkPRPfbG6TZ1MZJxFXtrxXSYfudkHNS0UmZyKQMVJmeZ1TGzX4vqgN5KikPyyxZY8H8sDORqERJzQIrQFh5GdsqpokxAhzEOO1sDsnx76zWtbw1QMjpqK4Ukb9k-1hklxm_wa_9CndhabJ60AseZZ35WrFMhwG6_sk-_16QSqpMDH-PSmHc-pYuaWlwzLuw7ohmo5P66KlKT7XlJdE3aytfUPfO4GDbJ6nabFOpmq34Ngbf3IM7vnN-8s4Mzl0sRBI93XuSU1kqxA5TUrVzQJGQYdq0_ISZmkndgcV4N3UeohdgvfGB_cImjPOjiTv4n5AX3s-rS3nbBGNgq2p0idpcgcz_2s7Udn-DbZDpDOgtRJLrBVpiLi07Y3w1yWRy-f1uk50DQbcUexi-4nYFNlNG1hdBJwfQR_RTnIbeBdZaO0bRmQVTGi1VBdRIBoreSsHUpnW5_tGdfyKXIh_naM_dBJZM4YanYtpCk20eWnqyhTpX3h101CZv2XehNnPljv2MQ30iFdzNv5oSCYBa-kxkudxglogWcQbqG896nD-qdLuCUBmTavPPUwdUsyDGvONIxPA6jY4ck_5tuG9e-h0W8R-U9yvKs7cdFb7KGGEIDKDQugSfsaTnM`,
      });
      return this.http.post(`${Service.apiUrl}/casts/editorVideo`, formData, {headers});
    }
  //implement the upload 
    upload() {
        let upload = new Promise((resolve, reject) => {
          this.loader['file'].then(
              (data) => {
                  this.uploadFile(data, this.url, 'test')
                  .subscribe(
                      (result) => {
 
                          resolve({ default: result['file'] })
                      },
                      (error) => {
                          reject(data.msg);
                      }
                  );
              }
          );
        });
        return upload;
    }
    abort() {
        console.log("abort")
    }
}
