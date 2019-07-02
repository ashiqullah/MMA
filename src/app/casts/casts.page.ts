import { Component, OnInit,ViewChild, NgZone } from '@angular/core';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { CastingProvider } from '../providers/casting/casting';
import { SafeHtml } from '@angular/platform-browser';
import { Service } from '../settings/Laravel';
import { UserProfilePage } from '../user-profile/user-profile.page';
import { ActivatedRoute , Router} from '@angular/router';
import { NavController, ActionSheetController, MenuController, Events,IonContent } from '@ionic/angular';
import { CodeNode } from 'source-list-map';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-casts',
  templateUrl: './casts.page.html',
  styleUrls: ['./casts.page.scss'],
})
export class CastsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  Casts: any[];
  displaycasts: any[];
  public searchTerm: string = "";
    ServerUrl: string;
    Maleimage: string;
    Femaleimage: string;
  public thumbnailData: string[];

  constructor(
    // public navParams: NavParams,
      private authService: AuthProvider,
      private userService: UserProvider,
      private castService: CastingProvider,
     /*  public modalController: ModalController,
      public actionSheetController: ActionSheetController,
      public popoverCtrl: PopoverController, */
      private activatedroute: ActivatedRoute,
      private router: Router,
      private navCtrl: NavController,
      public actionSheetController: ActionSheetController,
      public translate: TranslateService,
      public menu: MenuController,
      public events: Events,
      private zone: NgZone
  
      
 
      


  ) {
   
    this.Casts = [];
    this.displaycasts = [];
    this.ServerUrl = Service.url;
    this.Maleimage = Service.maleImageUrl;
    this.Femaleimage = Service.femaleImageUrl;
    events.subscribe('Video:Uploaded', (result) => {
        this.Casts = [];
        this.GetVideos();
        });


   }

  ngOnInit() {
   
    this.GetVideos();
  }
  GetVideos() {
    this.content.scrollToTop(1500);
    this.castService.getVideos().then((response: any) => {
        this.Casts = response.previousCasts;
        this.displaycasts = response.previousCasts;
        
        console.log(response);
    
    });
  }
  loadMoreVideos(event) {
    let last: any = this.Casts[this.Casts.length - 1];
    console.log(last.id);
    this.castService.getMoreVideos(last.id).then((response: any) => {
      console.log(response.previousCasts);
      this.Casts = this.Casts.concat(response.previousCasts);
     // event.complete();
      event.target.complete();

    });
  }
  openVideoPage(item) {
   // this.router.navigate(['/video-details', { video: item }]);
  // 'products/:id'
  this.navCtrl.navigateBack('video-details');

 }

 

 doRefresh(event) {
  let firstcast = this.Casts[0];
  console.log(firstcast.id);
  this.castService.getRefreshData(firstcast.id).then((response: any) => {
    console.log(response.previousCasts);
    this.Casts = this.Casts.concat(response.previousCasts);
    event.target.complete();
   
});

}

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Actions',
    buttons: [{
      text: this.translate.instant('VIDEOUPLOAD'),
      icon: 'cloud-upload',
      handler: () => {
        this.navCtrl.navigateForward('/video-upload');
      }
    }, {
      text: this.translate.instant('RECORDVIDEO'),
      icon: 'videocam',
      handler: () => {
        this.navCtrl.navigateForward('/video-recording');
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

setFilteredItems() {
 
 // this.Casts = this.filterItems(this.searchTerm);

  this.displaycasts = this.Casts
         .filter((item) => item.title.toLowerCase().includes(this.searchTerm.toLowerCase()));

}


filterItems(searchTerm) {
 
  return this.Casts.filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
}



}
