import { Component, OnInit,ViewChild, NgZone } from '@angular/core';
import {Events, NavParams,ModalController, ActionSheetController,IonContent} from '@ionic/angular';
import { ArticleProvider } from '../providers/Forum/article';
import { Service } from '../settings/Laravel';
import { Observable } from 'rxjs';

import {RepliesPage} from '../replies/replies.page';
import { EditmodalPage } from '../editmodal/editmodal.page'
import { UserProvider } from '../providers/user/user';
import { TranslateService } from '@ngx-translate/core';
import { CommentModel } from '../models/comment.model';

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
    commentModelArray: Array<CommentModel> = new Array<CommentModel>();


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
      events.subscribe('ReplyForcomment:created', (commentid, RepliesCount) => {
        let commentindex = this.getCommentindex(commentid);
        this.commentModelArray[commentindex].totalReplies = RepliesCount;
    });


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
        console.log(response);
        let tmp = response;
        for (let i = 0; i < response.length; i++) {


            this.commentModelArray.push({
                id: tmp[i].id,
                content: tmp[i].reply,
                isLiked: (tmp[i].likes.find(x => x.user_id === this.userID)) ? true : false,
                postedByImage: tmp[i].user.image,
                postedOn: tmp[i].created_at,
                postedby: tmp[i].user.name,
                totalLikes: tmp[i].likes.length,
                totalReplies: tmp[i].replies.length,
                postedByGender: tmp[i].user.gender,
                postedByid:tmp[i].user.id,
                hasAccessToEdit: (tmp[i].user_id == this.userID || this.userType==1) ? true : false,
            });

        }

    });
  }

  postComment() {
    this.articleService
    .userComment(this.articleid, this.commentText)
        .then((response: any) => {
let tmp = response.comment;
this.commentModelArray.unshift({
                id: tmp.id,
                content: tmp.reply,
                isLiked: (tmp.likes.find(x => x.user_id === this.userID)) ? true : false,
                postedByImage: tmp.user.image,
                postedOn: tmp.created_at,
                postedby: tmp.user.name,
                totalLikes: tmp.likes.length,
                totalReplies: tmp.replies.length,
                postedByGender: tmp.user.gender,
                postedByid:tmp.user.id,
                hasAccessToEdit: (tmp.user_id == this.userID || this.userType==1) ? true : false,
            });
           // this.commentModelArray.push(response);
this.events.publish('Comment:created', this.articleid, (response.totalcomments));

    });

    this.commentText  = '';

    this.content.scrollToBottom();

  }

  CommentLikeClick(Commentid) {
      this.articleService.commentLike(Commentid).then((response: any) => {
          //this.zone.run(() => {
          //    let indexOfComment = this.getCommentindex(Commentid);
          //    if (this.commentModelArray[indexOfComment].isLiked = true) {
          //        this.commentModelArray[indexOfComment].isLiked = false;
          //    }
          //    else {
          //        this.commentModelArray[indexOfComment].isLiked = true
          //    }
          //    this.commentModelArray[indexOfComment].totalLikes = response.count;

          //});

          console.log(response);

          this.zone.run(() => {
              let indexOfComment = this.getCommentindex(Commentid);
              if (response.like === 'liked') {
                  this.commentModelArray[indexOfComment].isLiked = true;

              }
              else {
                  this.commentModelArray[indexOfComment].isLiked = false

              }
              this.commentModelArray[indexOfComment].totalLikes = response.count;


          });
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
                  this.commentModelArray.splice(commentindex, 1);
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
      let lastid = Math.min.apply(Math, this.commentModelArray.map(s => s.id));
  //  console.log(lastid);
      this.articleService.getMoreComment(this.articleid,lastid).then((response: any) => {
     // console.log(response.articles);
   //   this.comments = this.comments.concat(response);
     // event.complete();

        let tmp = response;
        for (let i = 0; i < response.length; i++) {


            this.commentModelArray.push({
                id: tmp[i].id,
                content: tmp[i].reply,
                isLiked: (tmp[i].likes.find(x => x.user_id === this.userID)) ? true : false,
                postedByImage: tmp[i].user.image,
                postedOn: tmp[i].created_at,
                postedby: tmp[i].user.name,
                totalLikes: tmp[i].likes.length,
                totalReplies: tmp[i].replies.length,
                postedByGender: tmp[i].user.gender,
                postedByid:tmp[i].user.id,
                hasAccessToEdit: (tmp[i].user_id == this.userID || this.userType==1) ? true : false,
            });

        }



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
            this.articleService.userCommentEdit(commentId, dataReturned.data).then((response: any) => {
                this.commentModelArray[commentindex].content = response.reply;
          });
          });

     
      }
    });
 
    return await modal.present();

  }
    getCommentindex(id) {

        let comment = this.commentModelArray.find(x => x.id === id);
        return this.commentModelArray.indexOf(comment);
    } 
  

}
