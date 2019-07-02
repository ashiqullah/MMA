import { Component, OnInit, NgZone } from '@angular/core';
import {NavController, NavParams,ModalController, ActionSheetController} from '@ionic/angular';
import { Events } from '@ionic/angular';
import { ArticleProvider } from '../providers/Forum/article';
import { Service } from '../settings/Laravel';
import { EditmodalPage } from '../editmodal/editmodal.page'
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-replies',
  templateUrl: './replies.page.html',
  styleUrls: ['./replies.page.scss'],
})
export class RepliesPage implements OnInit {
 
  articleid;
  commentid: any;
  replyText;
  replies: any[];
  ServerUrl: string;
  maleimage: string;
  femaleimage: string;
  dataReturned:any;


  constructor(
    public navParams: NavParams,
    private articleService: ArticleProvider,
    public modalController: ModalController,
    public events: Events,
    public actionSheetController: ActionSheetController,
    public translate: TranslateService,
    private zone: NgZone
  ) {

    this.replies = [];
    this.commentid = this.navParams.get('commentid');
    this.articleService.getCommentReplies(this.commentid).then((response: any) => {
      this.replies = response.replies;
      this.articleid = response.article_id;
    });
    this.ServerUrl = Service.url;
    this.maleimage = Service.maleimage;
    this.femaleimage = Service.femaleimage;


  }
  dismiss() {
    this.modalController.dismiss();
}

ReplyLikeClick(replytid, replyindex) {
  this.articleService.replyLike(replytid).then((response: any) => {
     this.replies[replyindex].likes.length = response.count;
  });
}
async replyActionSheet(replyid,replyindex,replyContent) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Actions',
    buttons: [{
      text: this.translate.instant('DELETE'),
      role: 'destructive',
      icon: 'trash',
      handler: () => {

        this.zone.run(() => {
          this.articleService.Deleteuserreply(replyid).then((response: any) => {
            this.replies.splice(replyindex, 1);
          });
          });

      
      }
    }, {
      text: this.translate.instant('EDIT'),
      icon: 'create',
      handler: () => {

        this.replyEdit(replyid,replyindex,replyContent);
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

postReply() {
  this.articleService
  .userReply(this.commentid, this.articleid, this.replyText)
  .then((response: any) => {
    this.replies.push(response);
  });
// this.events.publish('Comment:created', this.articleid, (this.comments.length + 1));

  this.replyText  = '';


}

async replyEdit(replyId,replyIndex,replyText)
{
  const modal = await this.modalController.create({
    component: EditmodalPage,
    componentProps: {
      'ItemText': replyText,
      'paramTitle': 'Edit Reply'
    }
  });

  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null && dataReturned.data) {
      this.dataReturned = dataReturned.data;     
    

      this.zone.run(() => {
        this.articleService.userReplyEdit(replyId,dataReturned.data).then((response:any)=>{
         
          this.replies[replyIndex].content=response.content;
        });
        })
    }
  });

  return await modal.present();

}

  ngOnInit() {
  }

}
