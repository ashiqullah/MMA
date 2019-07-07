import { Component, OnInit ,NgZone} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import { homeProvider } from '../providers/Home/home';
import { NavController, Events, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UploadAdapter} from '../providers/uploadAdapter/UploadAdapter';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../providers/user/user';

@Component({
  selector: 'app-new-news',
  templateUrl: './new-news.page.html',
  styleUrls: ['./new-news.page.scss'],
})
export class NewNewsPage implements OnInit {
  public Editor = ClassicEditor;
  catagories: any[];
  contacts: any[];
  editOrSave: boolean = false;
  isAdmin: boolean = false;


  
    constructor(
        private fb: FormBuilder,
        private homeservice: homeProvider,
        public navCtrl: NavController,
        public events: Events,
        private alertCtlr: AlertController,
        private http: HttpClient ,
        public storage: Storage, 
        private route: ActivatedRoute,
        private router: Router, 
        public translate: TranslateService, 
        private zone: NgZone,
        private userService: UserProvider,
                  ) { 
      this.form.value.title = 'test here';

    }
  file;
  form = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    typeID: ['', Validators.required],
   // ExpairyDate: ['', Validators.required],
    group: [''],
    file: [null],
    status: [''],

});

  ngOnInit() {
    this.userService.getUserPermissions().then((response: any) => {
      this.isAdmin = (response[1].user_type == 1) ? true : false;
     });

    this.homeservice.getCategories().then((response: any) => {
      this.catagories = response.Coalition;
      this.contacts = response.Contactgroups;
      console.log(response);
        
    });
    
    const newsid: string = this.route.snapshot.queryParamMap.get('Newsid'); 
    if (newsid){
      this.editOrSave = true;
      this.homeservice.getNews(this.translate.currentLang, newsid).then((response: any) => {
        this.zone.run(() => {
         
       

      console.log(response);
      if(response.status==1)
      {
        this.form.controls.status.setValue('1');
      }
      else{
        this.form.controls.status.setValue('0');

      }
      this.form.get('id').setValue(response.id);
      this.form.get('title').setValue(response.en_title);
      //  this.form.get('category').setValue(response.name);
      this.form.get('description').setValue(response.en_content); 
     
      this.form.controls.typeID.setValue(response.type);
      this.form.controls.category.setValue(response.category_id);
     // this.form.get('category').setValue(response.notify_groups);
     // this.form.controls.status.setValue(1);
      //this.form.get('status').patchValue(1);
    
      console.log(response.status);
    //  this.form.get('category').setValue(response.category_id);
  });
     });
    }

  }


  
  postForm() {
    //  this.showLoader();
      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('en_title', this.form.value.title);
      formData.append('da_title', this.form.value.title);
      formData.append('ps_title', this.form.value.title);
      formData.append('en_content', this.form.value.description);
      formData.append('da_content', this.form.value.description);
      formData.append('ps_content', this.form.value.description);

      formData.append('category', this.form.value.category);
      formData.append('type', this.form.value.typeID);
      if(!this.isAdmin)
      {
        formData.append('status', '0');
      }
      else{
      formData.append('type', this.form.value.status);
      }
      this.homeservice.addnews(formData).then((response: any) => {
        console.log(response);
       // this.dismissLoader();
        this.events.publish('reloadHomepage');
        this.navCtrl.pop();
 
      }).catch((err: any) => {
        this.events.publish('reloadHomepage');
        this.navCtrl.pop();
        
      });
     
    }
    editform() {
      //  this.showLoader();
        const formData = new FormData();
      //  formData.append('image', this.file);
        formData.append('en_title', this.form.value.title);
        formData.append('da_title', this.form.value.title);
        formData.append('ps_title', this.form.value.title);
        formData.append('en_content', this.form.value.description);
        formData.append('da_content', this.form.value.description);
        formData.append('ps_content', this.form.value.description);
        formData.append('id', this.form.value.id);
        formData.append('ps_content', this.form.value.description);
      
        if (this.file){
          formData.append('image', this.file);
        }
  
        formData.append('category', this.form.value.category);
        formData.append('type', this.form.value.typeID);
        formData.append('status', this.form.value.status);
  
        this.homeservice.updatenews(formData).then((response: any) => {
          console.log(response);
         // this.dismissLoader();
        }).catch(err => {
          this.events.publish('reloadHomepage');
          this.navCtrl.pop();
    
          
                  });
       /*  this.events.publish('reloadHomepage');
        this.navCtrl.pop(); */
  
      }
  onFileChange(event) {
 
    if (event.target.files && event.target.files.length && (event.target.files[0].size / 1024 / 1024) < 1) {
          const [file] = event.target.files;
          this.file = file;
      } else {
          if (event.target.files[0].size > 1024) {
              this.showAlert('Error', 'please select image less than 1 MB', '');

          }

      }
        

        

    }

  
    async showAlert(title, msg, task) {
        const alert = await this.alertCtlr.create({header: title, subHeader: msg, buttons: ['Ok']});
        alert.present();
    }
    onReady($event) {
      $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader, '', this.http, this.storage);
      };
    }
}
