import { Component, OnInit } from '@angular/core';
import { ArticleProvider } from '../providers/Forum/article';
import { Service } from '../settings/Laravel';
import { EditmodalPage } from '../editmodal/editmodal.page'

import { NavController,  NavParams, ModalController , ActionSheetController , PopoverController , Events } from '@ionic/angular';



@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  artical: any;
  articleid: any;
  commentText: string;
  replyText: string;
  loading: boolean = false;
  catagoryName: string;
  ServerUrl: string;
  maleimage: string;
  femaleimage: string;
  dataReturned:any;

    constructor(
    private articleService: ArticleProvider,
    public navParams: NavParams,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,



    ) {
      this.ServerUrl = Service.url;
      this.maleimage = Service.maleimage;
      this.femaleimage = Service.femaleimage;
     }

  ngOnInit() {
    this.articleid = this.navParams.data.articleid;
    this.articleService.getArticle(this.articleid).then((response: any) => {
    this.artical = response.articles;
    });
  }
  dismiss() {
    this.modalController.dismiss();
}


LikeCliked(articleid) {
  this.articleService.getLikeInfo(articleid).then((response: any) => {
    this.artical.likes.length = response.likes;
  });
}

postComment() {
  this.articleService
  .userComment(this.articleid, this.commentText)
  .then((response: any) => {
    this.artical.comments.push(response);
  });

  this.commentText  = '';
}

CommentLikeClick(Commentid, cindex) {
  this.articleService.commentLike(Commentid).then((response: any) => {
    this.artical.comments[cindex].likes.length = response.count;
  });
}
ReplyLikeClick(replytid, replyindex,commentIndex) {
  this.articleService.replyLike(replytid).then((response: any) => {
     this.artical.comments[commentIndex].replies[replyindex].likes.length = response.count;
  });
}

UserReply(commentid, commnetindex) {
  let contentinput = document.querySelectorAll(
    '#comentreplytext' + commentid + '>input'
  )[0] as HTMLInputElement;

  let content = contentinput.value; //contentinput.textContent;
  this.articleService
    .userReply(commentid,this.artical.id, content)
    .then((response: any) => {
      let addedreply = {
        id: response.id,
        content: response.content,
        comment_id: response.comment_id,
        article_id: response.article_id,
        user_id: response.user_id,
        reply_date: response.reply_date,
        user: response.user,
        likes: response.likes
      };
      this.artical.comments[commnetindex].replies.push(
        addedreply
      );
      this.artical.replies.length =
        this.artical.replies.length + 1;
    });
  contentinput.value = '';
}

async commentActionSheet(commentid,commentindex,comment) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Actions',
    buttons: [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {

        this.articleService.DeleteuserComment(commentid).then((response: any) => {
          this.artical.comments.splice(commentindex, 1);
        });
      }
    }, {
      text: 'Edit',
      icon: 'create',
      handler: () => {
     
     this.commentedit(commentid,commentindex,comment);
      }
    },  {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
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
        console.log(dataReturned);
        this.articleService.userCommentEdit(commentId,dataReturned.data).then((response:any)=>{
          this.artical.comments[commentindex].reply=response.reply;
        });
      }
    });
 
    return await modal.present();

  }

  async replyActionSheet(replyid,commentIndex,replyindex,replyContent) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
  
          this.articleService.Deleteuserreply(replyid).then((response: any) => {
            this.artical.comments[commentIndex].replies.splice(replyindex, 1);
          });
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
  
          this.replyEdit(replyid,replyindex,commentIndex,replyContent);
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async replyEdit(replyId,replyIndex,commentIndex,replyText)
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
      console.log(dataReturned);
      this.articleService.userReplyEdit(replyId,dataReturned.data).then((response:any)=>{
        console.log(response);
        this.artical.comments[commentIndex].replies[replyIndex].content=response.content;
      });
    }
  });

  return await modal.present();

}

}
