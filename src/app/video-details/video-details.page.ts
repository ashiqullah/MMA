import { Component, OnInit,ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../settings/Laravel';
import { NavParams, ActionSheetController, AlertController,IonContent } from '@ionic/angular';
import { CastingProvider } from '../providers/casting/casting';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../providers/user/user';





@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.page.html',
  styleUrls: ['./video-details.page.scss'],
})
export class VideoDetailsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  
  ServerUrl: string;
  id: string;
  LoadedCast: any;
  message: string;
  Maleimage: string;
  Femaleimage: string;
  userID: any;
  userType: any;
  constructor(
    private route: ActivatedRoute, private router: Router,
    private castService: CastingProvider,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public translateService: TranslateService,
    private zone: NgZone,
    private userService: UserProvider,


   // public navParams: NavParams,


  ) {
    
  //  const firstParam: string = this.route.snapshot.queryParamMap.get('videoid'); 

    this.ServerUrl = Service.url;
    
    this.Maleimage = Service.maleImageUrl;
    this.Femaleimage = Service.femaleImageUrl;

  //  this.GetVideo(firstParam);

}

  ngOnInit() {
    this.userService.getUser().then((response: any) => {
      this.userID = response.id;
      this.userType = response.user_type;
     });
    const firstParam: string = this.route.snapshot.queryParamMap.get('videoid'); 
    this.GetVideo(firstParam);
  }

  sendMessage(castid: number){
// tslint:disable-next-line: triple-equals
    if (this.message != '') {
      this.castService.castComment(castid, this.message).then((response: any) => {
      
        const comment =response.comment;
        comment.user = response.user;
        this.message = '';
        console.log(comment);
        this.LoadedCast.comments = this.LoadedCast.comments.concat(comment);
      });
    //  this.content.scrollToBottom(1500);
      this.content.scrollToBottom()
    }
  }

  GetVideo(videoid) {

    this.castService.loadSingleVideo(videoid).then((response: any) => {
      this.LoadedCast = response.cast;
      console.log(response.cast);

    });
  }

  async commentActionSheet(commentid,commentContent) {
    let commentindex = this.getCommentindex(commentid);
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: this.translateService.instant('DELETE'),
        role: 'destructive',
        icon: 'trash',
        handler: () => {
        
          this.castService.DeleteVideoComment(commentid).then((response: any) => {
            this.zone.run(() => {
            this.LoadedCast.comments.splice(commentindex, 1);
            });
          });
        }
      }, {
        text: this.translateService.instant('EDIT'),
        icon: 'create',
        handler: () => {
          
        this.updateCommment(commentid,commentContent,commentindex);
          
        }
      },  {
        text:this.translateService.instant('CANCEL'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


 async updateCommment(commentID, commentContent,commentindex){
    let prompt = await this.alertCtrl.create({
      header: 'Edit comment',
      message: 'Update the Comment',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: commentContent
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.castService.castCommentUpdate(commentID,data.title).then((response: any) => {
              this.zone.run(() => {
              this.LoadedCast.comments[commentindex].comment=response;

              });
            });
          }
        }
      ]
    });
    await  prompt.present();
  }
  getCommentindex(id){

    let Comment = this.LoadedCast.comments.find(x => x.id === id);
    return this.LoadedCast.comments.indexOf(Comment);
   } 
}
