import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'forum', loadChildren: './forum/forum.module#ForumPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'forum', loadChildren: './forum/forum.module#ForumPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'casts', loadChildren: './casts/casts.module#CastsPageModule' },
  { path: 'video-details', loadChildren: './video-details/video-details.module#VideoDetailsPageModule' },
  { path: 'video-details/:id', loadChildren: './video-details/video-details.module#VideoDetailsPageModule' },
  { path: 'video-upload', loadChildren: './video-upload/video-upload.module#VideoUploadPageModule' },
  { path: 'new-article', loadChildren: './new-article/new-article.module#NewArticlePageModule' },
  { path: 'comments', loadChildren: './comments/comments.module#CommentsPageModule' },
  { path: 'replies', loadChildren: './replies/replies.module#RepliesPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'editmodal', loadChildren: './editmodal/editmodal.module#EditmodalPageModule' },
  { path: 'article', loadChildren: './article/article.module#ArticlePageModule' },
  { path: 'configuration', loadChildren: './configuration/configuration.module#ConfigurationPageModule' },
  { path: 'm-rich-editor', loadChildren: './m-rich-editor/m-rich-editor.module#MRichEditorPageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'news/:myid', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'video-recording', loadChildren: './video-recording/video-recording.module#VideoRecordingPageModule' },
  { path: 'new-news', loadChildren: './new-news/new-news.module#NewNewsPageModule' },
  { path: 'resurces', loadChildren: './resurces/resurces.module#ResurcesPageModule' },
  { path: 'coalitions', loadChildren: './coalitions/coalitions.module#CoalitionsPageModule' },
  { path: 'coalition-details', loadChildren: './coalition-details/coalition-details.module#CoalitionDetailsPageModule' },
  { path: 'coalition-deputies', loadChildren: './coalition-deputies/coalition-deputies.module#CoalitionDeputiesPageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
