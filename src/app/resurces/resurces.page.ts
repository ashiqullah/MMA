import { Component, OnInit,ViewChild } from '@angular/core';
import { resourcesProvider } from '../providers/resources/resources';
import { IonSelect } from '@ionic/angular';
import { Service } from '../settings/Laravel';
import { PdfViewerService } from '../providers/pdf-viewer/pdf-viewer';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-resurces',
  templateUrl: './resurces.page.html',
  styleUrls: ['./resurces.page.scss'],
})
export class ResurcesPage implements OnInit {
  @ViewChild('sectionSelect') sectionSelect: IonSelect;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  categories: any[];
  Resouces: any[];
  CategorySelected:any;
  ServerUrl: string;
  Maleimage: string;
  Femaleimage: string;
  nullresouceimage:string;
  loading: boolean = false;
  constructor(private resoucesService: resourcesProvider ,private pdfService:PdfViewerService, public translate: TranslateService,private theInAppBrowser: InAppBrowser) {
this.categories = [];
this.Resouces = [];
this.ServerUrl = Service.url;
    this.Maleimage = Service.maleImageUrl;
    this.Femaleimage = Service.femaleImageUrl;

    this.nullresouceimage='upload/resources/resource.PNG';

   }

  ngOnInit() {
this.loading=true;
  this.resoucesService.getResources().then((response: any)=>{
    this.loading=false;
this.categories=response.category;
this.Resouces=response.Items;
    console.log(response);
  })
  }

  doFilter() {
    this.sectionSelect.open();
 }
 changeCategory(){
  
  if (this.CategorySelected){

    this.Resouces=[];
    this.resoucesService.getResourcesBySlug(this.CategorySelected).then((response: any)=>{
      this.Resouces=response;
          console.log(response);
        })

  }

}

download(url,title)
{
  this.pdfService.download(url,title);
}

public openWithSystemBrowser(url : string){
  let target = "_system";
  this.theInAppBrowser.create(url,target, 'location=yes');
}
public openWithInAppBrowser(url : string){
  let target = "_blank";
  this.theInAppBrowser.create(url,target, 'location=yes');
}
public openWithCordovaBrowser(url : string){
  let target = "_self";
  this.theInAppBrowser.create(url,target,'location=yes');
} 
}
