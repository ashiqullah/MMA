import { Component, OnInit, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';
import { NavController, ModalController, IonContent , ActionSheetController , PopoverController , Events, MenuController } from '@ionic/angular';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ArticleProvider } from '../providers/Forum/article';
import { Service } from '../settings/Laravel';
import { UserProfilePage } from '../user-profile/user-profile.page';
import { ActivatedRoute } from '@angular/router';
import {CommentsPage} from "../comments/comments.page";
import { MRichEditorPage } from '../m-rich-editor/m-rich-editor.page';
import { TranslateService } from '@ngx-translate/core';
import { ArticleModel } from '../models/article.model';



@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

 ArticleModelArray:  Array<ArticleModel> = new Array<ArticleModel>();
  Articals: any[]; 
  loading: boolean = false;
  catagoryName: any;
  ServerUrl: string;
  Maleimage: string;
  Femaleimage: string;
  catagories: any[];
  dataReturned: any;

  SelectedCatagory: any ;

  catagory: any;
  form: any;
  userID: any;
  userType: any;
  constructor(
    public navCtrl: NavController,
    private authService: AuthProvider,
    private userService: UserProvider,
    private articleService: ArticleProvider,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public popoverCtrl: PopoverController,
    public events: Events,
    public translate: TranslateService,
    private zone: NgZone
  

  
  ) {

    this.Articals = [];
    this.ArticleModelArray=[];
    this.ServerUrl = Service.url;
    this.Maleimage = Service.maleImageUrl;
    this.Femaleimage = Service.femaleImageUrl;
    this.userService.getUser().then((response: any) => {
    this.userID = response.id;
    this.userType = response.user_type;
   });
   


    events.subscribe('Comment:created', (articleid, CommentCount) => {
      let Articleindex = this.getArticleindex(articleid);
      this.Articals[Articleindex].comments.length = CommentCount;
    });

    events.subscribe('category:changed', (catagoryId) => {
     this.getArticlesByID(catagoryId);
    })


  }

 

 
  

  async Allcatagories() {

    this.articleService.allgatacories().then((response: any) => {
      this.catagories = response;
     
    });
 }

 changeCategory(){
  if (this.SelectedCatagory){
    this.getArticlesByID(this.SelectedCatagory);

  }
}

    getArticlesByID(catagoryId: number) {

    this.loading = true;
    this.Articals = [];
    this.ArticleModelArray=[];
    this.Articals.pop();
   // this.content.scrollToTop(1500);
    this.articleService.getArticles(catagoryId).then((response: any) => {
      this.loading = false;
      this.Articals = response.articles;
      this.catagoryName = response.category;
     /*  console.log(response.articles);
      let tmp=response.articles;
      for (let i = 0; i < response.articles.length; i++)
      {
        let tmpcomment=null;
        if(tmp[i].comments.length>0)
        {

          tmpcomment= {
            commentcontent:tmp[i].comments[0].reply,
            userid:response.articles[0].comments[0].user_id,
            userimage: response.articles[i].comments[0].user.image
          };
        }
        console.log(tmpcomment);
        this.ArticleModelArray.push({
          id: response.articles[i].id,
          content: response.articles[i].body,
          isLiked: true,
          lastComment: tmpcomment,
          postedByImage: response.articles[i].user.image,
          postedOn: response.articles[i].created_at,
          postedby: response.articles[i].name,
          title: response.articles[i].title,
          totalComments: response.articles[i].comments.length,
          totalLikes: response.articles[i].likes.length,
          totalReplies: response.articles[i].replies.length,
          postedByGender: response.articles[i].user.gender,
        });

      }
      console.log(this.ArticleModelArray); */
    });
    
  }
  LikeCliked(articleid, index) {
    this.articleService.getLikeInfo(articleid).then((response: any) => {
      this.Articals[index].likes.length = response.likes;
    });
  }



  loadMoreArticles(event) {
      let last: any = this.Articals[this.Articals.length - 1];
      this.articleService.getMoreArticles(this.catagoryName.id, last.id).then((response: any) => {
      this.Articals = this.Articals.concat(response);
      event.target.complete();

    });
  }


  async ionViewCanEnter() {
    let isAuthenticated = await this.authService.checkIsAuthenticated();
    return isAuthenticated;
  }

  async presentModal(profileId: number) {
    const modal = await this.modalController.create({
      component: UserProfilePage,
      componentProps: { value: profileId }
    });
    return await modal.present();
  }



   async presentActionSheet(articleId: number, Articleindex, content : string, title : string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [ {
        text: this.translate.instant('EDIT'),
        icon: 'create',
        handler: () => {
          this.Articledit(articleId, content, Articleindex, title);
        }
      },  {
        text: this.translate.instant('CANCEL'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async Articledit(Articleid, content, articleindex, title)
  {



    const modal = await this.modalController.create({
      component: MRichEditorPage,
      componentProps: {
        'modalTitle': 'Edit Article' ,
        'content': content,
        'title': title
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

      if (dataReturned !== null && dataReturned.data) {
    
        console.log(this.dataReturned);
        this.dataReturned = dataReturned.data;
        const formData = new FormData();
       // formData.append('attachment', this.file);
        formData.append('article_id', this.Articals[articleindex].id);
        formData.append('title', this.dataReturned.title);
        formData.append('body', this.dataReturned.content);

        this.articleService.editarticle(formData).then((response: any) => {
          this.zone.run(() => {
            this.Articals[articleindex].body = response.body;
            this.Articals[articleindex].title = response.title;
          });
          
        });
      }
    });
    return await modal.present();

  }

    ngOnInit() {

        this.getArticlesByID(1);
        this.Allcatagories();
       

  }





async commentPost(articleId) {
  let modal = await this.modalController.create({
    component: CommentsPage,
    componentProps: { articleid: articleId }
  });
  modal.present();
}
 getArticleByFind(id){
  return this.Articals.find(x => x.id === id);
}
getArticleindex(id){

  let article = this.Articals.find(x => x.id === id);
  return this.Articals.indexOf(article);
    }

    checkIfLiked(userid, items) {
        //let didfount = items.find(x => x.user_id === userid);
        //let checked = (typeof didfount !== 'undefined') ? true : false;
        //console.log(didfount);
        // debugger;
        return true;
    }

 




}
