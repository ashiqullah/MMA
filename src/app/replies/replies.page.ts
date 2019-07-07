import { Component, OnInit, NgZone } from '@angular/core';
import {NavController, NavParams, ModalController, ActionSheetController} from '@ionic/angular';
import { Events } from '@ionic/angular';
import { ArticleProvider } from '../providers/Forum/article';
import { Service } from '../settings/Laravel';
import { EditmodalPage } from '../editmodal/editmodal.page';
import { TranslateService } from '@ngx-translate/core';
import { ReplyModel } from '../models/reply.model';
import { UserProvider } from '../providers/user/user';


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
  dataReturned: any;
ReplyModelArray: ReplyModel[];
userID: any;
userType: any;


  constructor(
    public navParams: NavParams,
    private articleService: ArticleProvider,
    public modalController: ModalController,
    public events: Events,
    public actionSheetController: ActionSheetController,
    public translate: TranslateService,
    private zone: NgZone,
    private userService: UserProvider,
  ) {

    this.userService.getUser().then((response: any) => {
      this.userID = response.id;
      this.userType = response.user_type;
     });
    this.replies = [];
    this.ReplyModelArray = [];
    this.commentid = this.navParams.get('commentid');
    this.articleService.getCommentReplies(this.commentid).then((response: any) => {

      let tmp = response.replies;
      for (let i = 0; i < tmp.length; i++)
      {
        
       this.ReplyModelArray.push({
          id: tmp[i].id,
          content: tmp[i].content,
           isLiked: (tmp[i].likes.find(x => x.user_id === this.userID)) ? true : false,
          postedByImage: tmp[i].user.image,
          postedOn: tmp[i].reply_date,
          postedby: tmp[i].user.name,
          totalLikes: tmp[i].likes.length,
          postedByGender: tmp[i].user.gender,
          postedByid:tmp[i].user.id,
          hasAccessToEdit: (tmp[i].user_id == this.userID || this.userType==1) ? true : false,
        });

      }
      console.log(response.replies);

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

ReplyLikeClick(replytid) {

  this.articleService.replyLike(replytid).then((response: any) => {
   //  this.replies[replyindex].likes.length = response.count;

   this.zone.run(() => {
    let replyindex= this.getReplyindex(replytid);
    if (response.like === 'liked') {
        this.ReplyModelArray[replyindex].isLiked = true;

    }
    else {
        this.ReplyModelArray[replyindex].isLiked = false;

    }
    this.ReplyModelArray[replyindex].totalLikes = response.count;


});
  });
}
async replyActionSheet(replyid, replyindex, replyContent) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Actions',
    buttons: [{
      text: this.translate.instant('DELETE'),
      role: 'destructive',
      icon: 'trash',
      handler: () => {

        this.zone.run(() => {
          this.articleService.Deleteuserreply(replyid).then((response: any) => {
            this.ReplyModelArray.splice(replyindex, 1);
          });
          });

      
      }
    }, {
      text: this.translate.instant('EDIT'),
      icon: 'create',
      handler: () => {

        this.replyEdit(replyid, replyindex, replyContent);
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
      let tmp = response.reply;
      this.ReplyModelArray.unshift({
      id: tmp.id,
      content: tmp.content,
       isLiked: (tmp.likes.find(x => x.user_id === this.userID)) ? true : false,
      postedByImage: tmp.user.image,
      postedOn: tmp.reply_date,
      postedby: tmp.user.name,
      totalLikes: tmp.likes.length,
      postedByGender: tmp.user.gender,
      postedByid:tmp.user.id,
      hasAccessToEdit: (tmp.user_id == this.userID || this.userType==1) ? true : false,
    });

  //  this.replies.push(response);

      this.events.publish('Reply:created', this.articleid, (response.articlereplycount));
      this.events.publish('ReplyForcomment:created', this.commentid, (response.commentreplycount));

  });

  this.replyText  = '';


}

async replyEdit(replyId, replyIndex, replyText)
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
        this.articleService.userReplyEdit(replyId, dataReturned.data).then((response: any) => {
         
          this.ReplyModelArray[replyIndex].content = response.content;
        });
        })
    }
  });

  return await modal.present();

}

  ngOnInit() {
  }

  getReplyindex(id) {

    let Reply = this.ReplyModelArray.find(x => x.id === id);
    return this.ReplyModelArray.indexOf(Reply);
} 

}
