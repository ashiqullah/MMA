import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class ArticleProvider {

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async getLikeInfo (articleid: number)
  {

    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/article/like/${articleid}`, { headers }).toPromise();
  }
  async userComment(articleid: number,commentcontent: string)
  {
    let postData = {
      'article_id': articleid,
      'reply': commentcontent
};
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/forum/save_reply`,postData, { headers }).toPromise();
  }
  async commentLike(Commentid: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/article/likecomment/${Commentid}`, { headers }).toPromise();
  }
  async replyLike(replyid: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/article/likereply/${replyid}`, { headers }).toPromise();
  }

  async DeleteuserComment(CommentID: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/delete_usercomment/${CommentID}`, { headers }).toPromise();
  }
  async Deleteuserreply(replyid: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/delete/your/reply/${replyid}`, { headers }).toPromise();
  }
  async userReply(commentid: number,articleid: number,replycontent: string)
  {
    let postData = {
      'comment_id': commentid,
      'article_id': articleid,
      'content': replycontent
};
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/replytocomment_add`,postData, { headers }).toPromise();
  }
  async getMoreArticles(catagoryid:number,lastArticleid: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/readMore/${catagoryid}/${lastArticleid}`, { headers }).toPromise();
  }

  async getArticles(catagoryid:number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/category/${catagoryid}`, { headers }).toPromise();
  }

  async deleteForum(forumid:number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/deleteforum/${forumid}`, { headers }).toPromise();
  }
  async allgatacories()
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/allcategories/1`, { headers }).toPromise();
  }

  async savearticle(formdata: FormData)
  {
    
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/forum/save_article`,formdata, { headers }).toPromise();
  }

  async editarticle(formdata: FormData)
  {
    
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/forum/update_article`,formdata, { headers }).toPromise();
  }

  async getComments(articleid: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/getCommentsajax/${articleid}`, { headers }).toPromise();

  }
  async getCommentReplies(commentid: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/commentrepliesajax/${commentid}`, { headers }).toPromise();

  }
  async getMoreComment(articleid: number, lastcommentid: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/getCommentsajaxMore/${articleid}/${lastcommentid}`, { headers }).toPromise();
  }
  async userCommentEdit(commentid: number,replycontent: string)
  {
    let postData = {
      'id': commentid,
      'reply': replycontent
};
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/forum/update_comment`,postData, { headers }).toPromise();
  }
  async userReplyEdit(replyid: number,replycontent: string)
  {
    let postData = {
      'id': replyid,
      'reply': replycontent
};
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.post(`${Service.apiUrl}/forum/update_reply`,postData, { headers }).toPromise();
  }

  async getArticle(Articleid: number)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    });
    return this.http.get(`${Service.apiUrl}/forum/article/${Articleid}`, { headers }).toPromise();
  }





}
