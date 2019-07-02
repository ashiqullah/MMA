import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Events, NavParams} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { CastingProvider } from '../providers/casting/casting';
import { TranslateService } from '@ngx-translate/core';
import { groupBy } from 'rxjs/internal/operators/groupBy';

const baseUrl = 'http://192.168.43.210:85/';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPE = 'video/mp4';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.page.html',
  styleUrls: ['./video-upload.page.scss'],
})
export class VideoUploadPage implements OnInit {

  constructor(
    public navCtrl: NavController,
  /*    private camera: Camera,
    private transfer: FileTransfer, */
     private fileS: File,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, private fb: FormBuilder,
    private castService: CastingProvider, public events: Events , public navParams: NavParams,
  ) {
    this.groups = [];
    this.getGroups();
   }

  groups: any[];


  file;
  title;
  description;

  form = this.fb.group({
      file: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      groupid: ['', Validators.required]
  });
  loader: HTMLIonLoadingElement;

  async getGroups() {

    this.castService.getGroups().then((response: any) => {
      this.groups = response;
    });
  }

 async showLoader() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.loader.present();
  }

 async dismissLoader() {
  await  this.loader.dismiss();
  }

postForm() {
  this.showLoader();
  const formData = new FormData();
  formData.append('file', this.file);
  formData.append('title', this.form.value.title);
  formData.append('description', this.form.value.description);
  formData.append('group_id', this.form.value.groupid);

  this.castService.saveCast(formData).then((response: any) => {
    console.log(response);
   // this.dismissLoader();
   this.events.publish('Video:Uploaded',true);
  });
  this.dismissLoader();
    this.navCtrl.navigateBack('/tabs/tab2');

}

onFileChange(event) {
  if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;

  }
}

  ngOnInit() {
    const videourl = this.navParams.get('VideoUrl');
    const videofilename = this.navParams.get('videofilename');
    console.log(videourl);
    if (videourl) {

      try {
      //  var dirUrl =  this.fileS.resolveDirectoryUrl(videourl);
        //var retrievedFile =  this.fileS.getFile(dirUrl,videofilename,{});
       // var retrievedFile =  this.file.getFile(dirUrl, filename, {});
       // this.fileS.ge
       //this.file = retrievedFile.nativeURL;
      } catch(err) {
        
      }

      this.file = videourl;
    }
  }

}
