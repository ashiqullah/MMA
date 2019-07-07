import { Component, OnInit, ViewChild, ViewEncapsulation, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
import { TimeagoModule } from 'ngx-timeago';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';




@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class ForumPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

    ArticleModelArray: ArticleModel[];//  Array<ArticleModel> = new Array<ArticleModel>();
    

 // Articals: any[]; 
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
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private transfer: FileTransfer,
    private file: File
  

  
  ) {

   // this.Articals = [];
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
      this.ArticleModelArray[Articleindex].totalComments = CommentCount;
      this.cdr.detectChanges();

    });
    events.subscribe('Reply:created', (articleid, RepliesCount) => {
          let Articleindex = this.getArticleindex(articleid);
          this.ArticleModelArray[Articleindex].totalReplies = RepliesCount;
      this.cdr.detectChanges();

      });

    events.subscribe('category:changed', (catagoryId) => {
     this.getArticlesByID(catagoryId);
    });


  }
   fileTransfer: FileTransferObject = this.transfer.create();
   download() {
    const url = 'http://www.example.com/file.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
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
    //this.Articals = [];
    this.ArticleModelArray=[];
  //  this.Articals.pop();
   // this.content.scrollToTop(1500);
    this.articleService.getArticles(catagoryId).then((response: any) => {
      this.loading = false;
     // this.Articals = response.articles;
      this.catagoryName = response.category;
      console.log(response.articles);
      let tmp=response.articles;
      for (let i = 0; i < response.articles.length; i++)
      {
       
        
        this.ArticleModelArray.push({
          id:tmp[i].id,
          content: tmp[i].body,
           isLiked: (tmp[i].likes.find(x => x.user_id === this.userID)) ? true : false,         
          postedByImage: tmp[i].user.image,
          postedOn: tmp[i].created_at,
          postedby: tmp[i].user.name,
          title:tmp[i].title,
          totalComments: tmp[i].comments.length,
          totalLikes: tmp[i].likes.length,
          totalReplies: tmp[i].replies.length,
          postedByGender:tmp[i].user.gender,
          postedByid:tmp[i].user.id,
          hasAccessToEdit: (tmp[i].user_id == this.userID || this.userType==1) ? true : false,
        });

      }
      this.cdr.detectChanges();
      console.log(this.ArticleModelArray);
    });
    
  }
  LikeCliked(articleid) {
      this.articleService.getLikeInfo(articleid).then((response: any) => {
          this.zone.run(() => {
              let indexOfArticle = this.getArticleindex(articleid);
              if (response.like === 'liked') {
                  this.ArticleModelArray[indexOfArticle].isLiked = true;
              }
              else {
                  this.ArticleModelArray[indexOfArticle].isLiked = false
              }
              this.ArticleModelArray[indexOfArticle].totalLikes =  response.likes;
              
          });
          this.cdr.detectChanges();
    });
  }



  loadMoreArticles(event) {
    /*   let last: any = this.Articals[this.Articals.length - 1];
      this.articleService.getMoreArticles(this.catagoryName.id, last.id).then((response: any) => {
      this.Articals = this.Articals.concat(response);
      event.target.complete();

    }); */

    let last: any=this.ArticleModelArray[this.ArticleModelArray.length-1];
   
    this.articleService.getMoreArticles(this.catagoryName.id, last.id).then((response: any) => {
      //this.Articals = this.Articals.concat(response);

      let tmp=response;
      for (let i = 0; i < response.length; i++)
      {
        
        this.ArticleModelArray.push({
          id: tmp[i].id,
          content: tmp[i].body,
          isLiked:(tmp[i].likes.find(x => x.user_id === this.userID))? true : false,         
          postedByImage: tmp[i].user.image,
          postedOn: tmp[i].created_at,
          postedby: tmp[i].user.name,
          title: tmp[i].title,
          totalComments: tmp[i].comments.length,
          totalLikes: tmp[i].likes.length,
          totalReplies: tmp[i].replies.length,
          postedByGender: tmp[i].user.gender,
          postedByid:tmp[i].user.id,
          hasAccessToEdit: (tmp[i].user_id == this.userID || this.userType==1) ? true : false,

        });
      }
      this.cdr.detectChanges();
      console.log(this.ArticleModelArray);
   
    //  this.ArticleModelArray = this.ArticleModelArray.concat(tmp);
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
      },
      {
        text: this.translate.instant('DELETE'),
        icon: 'trash',
        handler: () => {
          this.zone.run(() => {
           
            this.articleService.deleteForum(articleId).then((response: any) => {
            this.ArticleModelArray.splice(Articleindex, 1);
      this.cdr.detectChanges();

        
            });
          });
        }
      }
      
      ,  {
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
        if(this.dataReturned.filedata)
        {
       formData.append('attachment',this.dataReturned.filedata);          
        }
        formData.append('article_id', this.ArticleModelArray[articleindex].id.toString());
        formData.append('title', this.dataReturned.title);
        formData.append('body', this.dataReturned.content);
        this.articleService.editarticle(formData).then((response: any) => {
        //  debugger;
          this.zone.run(() => {
             this.ArticleModelArray[articleindex].content = response.body;
              this.ArticleModelArray[articleindex].title = response.title; 
      this.cdr.detectChanges();
             
          });
          
        });
      }
    });
    return await modal.present();

  }

    ngOnInit() {
        this.cdr.detach();
        this.getArticlesByID(1);
        this.Allcatagories();
       

  }





    async commentPost(articleId) {
     //   changeDetectorRef.detach();

  let modal = await this.modalController.create({
    component: CommentsPage,
    componentProps: { articleid: articleId }
  });
  modal.present();
}
 getArticleByFind(id){
//  return this.Articals.find(x => x.id === id);
}
 getArticleindex(id){

     let article = this.ArticleModelArray.find(x => x.id === id);
     return this.ArticleModelArray.indexOf(article);
    } 

   

 




}
