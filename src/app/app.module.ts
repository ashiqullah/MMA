import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

//
import { HttpClientModule } from '@angular/common/http';
import { AuthProvider } from '../app/providers/auth/auth';
import { UserProvider } from '../app/providers/user/user';
import { ArticleProvider } from '../app/providers/Forum/article';
import { CastingProvider } from '../app/providers/casting/casting';
import { notificationProvider } from '../app/providers/notifications/notification';
import { homeProvider } from '../app/providers/Home/home';
import { resourcesProvider } from '../app/providers/resources/resources';
import { CoalitionProvider } from '../app/providers/Coalition/coalition';
import {OneSignal} from '@ionic-native/onesignal/ngx';


import { IonicStorageModule } from '@ionic/storage';

import { ForumPage } from '../app/forum/forum.page';
// import { PipesModule } from './pipes/pipes.modules';
import { UserProfilePageModule } from '../app/user-profile/user-profile.module';
import { CommentsPageModule } from '../app/comments/comments.module';
import {RepliesPageModule} from '../app/replies/replies.module';
import { EditmodalPageModule } from '../app/editmodal/editmodal.module';
import { ArticlePageModule } from '../app/article/article.module';
import { MRichEditorPageModule } from '../app/m-rich-editor/m-rich-editor.module';
import { VideoUploadPageModule } from '../app/video-upload/video-upload.module';
import { ResurcesPageModule } from '../app/resurces/resurces.module';
import { CoalitionsPageModule } from '../app/coalitions/coalitions.module';
import { CoalitionDetailsPageModule } from '../app/coalition-details/coalition-details.module';
import { CoalitionDeputiesPageModule } from '../app/coalition-deputies/coalition-deputies.module';
import {ChangepasswordPageModule} from '../app/changepassword/changepassword.module';



import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {  HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { pipe } from 'rxjs';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguageService} from '../app/providers/language/language.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
// import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
/* import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons'; */

import { MediaCapture } from '@ionic-native/media-capture/ngx';
//import { File } from '@ionic-native/file/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { PdfViewerService } from "../app/providers/pdf-viewer/pdf-viewer";
import { FileOpener } from "@ionic-native/file-opener/ngx";


// library.add(fas);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent
  ],

  entryComponents: [],
  imports: [BrowserModule, TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
// tslint:disable-next-line: max-line-length
  }), IonicStorageModule.forRoot(), IonicModule.forRoot(), AppRoutingModule, HttpClientModule, UserProfilePageModule, CommentsPageModule, RepliesPageModule, EditmodalPageModule, ArticlePageModule, CKEditorModule, MRichEditorPageModule, VideoUploadPageModule, ResurcesPageModule, CoalitionsPageModule,CoalitionDetailsPageModule,CoalitionDeputiesPageModule,ChangepasswordPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
// tslint:disable-next-line: deprecation
    FileTransfer,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthProvider,
    UserProvider,
    ArticleProvider,
    LanguageService,
    CastingProvider,
    notificationProvider,
      homeProvider,
    CoalitionProvider,
    MediaCapture,
    File,
    VideoEditor,
  StreamingMedia,
    WebView,
    OneSignal,
    resourcesProvider,
    FileOpener,
    PdfViewerService,
    
    

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
