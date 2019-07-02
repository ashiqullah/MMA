import { Component, OnInit,ViewChild, NgZone } from '@angular/core';
import {Events, NavParams,ModalController, ActionSheetController,IonContent} from '@ionic/angular';
import { ArticleProvider } from '../providers/Forum/article';
import { Service } from '../settings/Laravel';
import { Observable } from 'rxjs';

import {RepliesPage} from '../replies/replies.page';
import { EditmodalPage } from '../editmodal/editmodal.page'
import { UserProvider } from '../providers/user/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  articleid: any;
  commentText;
  comments:  any[];
  ServerUrl: string;
  maleimage: string;
  femaleimage: string;
  dataReturned:any;
  userID:any;
  userType:any;


  constructor(    public navParams: NavParams,
                  private articleService: ArticleProvider,
                  public modalController: ModalController,
                  public events: Events,
                  public actionSheetController: ActionSheetController,
                  private userService: UserProvider,
                  public translate: TranslateService,
                  private zone: NgZone


    ) {
      this.comments = [];
    
      this.ServerUrl = Service.url;
      this.maleimage = Service.maleImageUrl;
      this.femaleimage = Service.femaleImageUrl;
   


     }

  ionViewDidLoad() {
    

  }
  dismiss() {
    this.modalController.dismiss();
}

  ngOnInit() {
    this.articleid = this.navParams.get('articleid');

    this.userService.getUser().then((response: any) => {
      this.userID= response.id;
      this.userType=response.user_type;
     });
    this.articleService.getComments(this.articleid).then((response: any) => {
      this.comments = response;
    });
  }

  postComment() {
    this.articleService
    .userComment(this.articleid, this.commentText)
    .then((response: any) => {
      this.comments.push(response);
    });
    this.events.publish('Comment:created', this.articleid, (this.comments.length + 1));

    this.commentText  = '';

    this.content.scrollToBottom();

  }

  CommentLikeClick(Commentid, cindex) {
    this.articleService.commentLike(Commentid).then((response: any) => {
      this.comments[cindex].likes.length = response.count;
    });
  }

  async commentActionSheet(commentid,commentindex,comment) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: this.translate.instant('DELETE'),
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.zone.run(() => {
            this.articleService.DeleteuserComment(commentid).then((response: any) => {
              this.comments.splice(commentindex, 1);
            });
            });
         
        }
      }, {
        text: this.translate.instant('EDIT'),
        icon: 'create',
        handler: () => {
       
       this.commentedit(commentid,commentindex,comment);
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

  async commentreplies(commentId) {
    let modal = await this.modalController.create({
      component: RepliesPage,
      componentProps: { commentid: commentId }
    });
    modal.present();
  }

  loadMoreComments(event) {
  //  let last: any = this.comments[this.comments.length - 1];
    let lastid= Math.min.apply(Math,this.comments.map(s => s.id));
    console.log(lastid);
    this.articleService.getMoreComment(this.articleid,lastid).then((response: any) => {
     // console.log(response.articles);
      this.comments = this.comments.concat(response);
     // event.complete();
      event.target.complete();
  
    });
  }

  async commentedit(commentId,commentindex,commentText)
  {
    const modal = await this.modalController.create({
      component: EditmodalPage,
      componentProps: {
        'ItemText': commentText,
        'paramTitle': 'Edit Comment'
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data) {
        this.dataReturned = dataReturned.data;
   
        this.zone.run(() => {
          this.articleService.userCommentEdit(commentId,dataReturned.data).then((response:any)=>{
            this.comments[commentindex].reply=response.reply;
          });
          });

     
      }
    });
 
    return await modal.present();

  }
  

}
