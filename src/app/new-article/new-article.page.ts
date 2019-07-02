import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticleProvider } from '../providers/Forum/article';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { UploadAdapter} from '../providers/uploadAdapter/UploadAdapter';
import { Storage } from '@ionic/storage';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Events, NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.page.html',
  styleUrls: ['./new-article.page.scss'],
})
export class NewArticlePage implements OnInit {
  public Editor = ClassicEditor;
  catagoryid: any;
  catagoryName: any;

// tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private articleService: ArticleProvider, private route: ActivatedRoute, private router: Router, private http: HttpClient , public storage: Storage,    public events: Events,private navCtrl: NavController ) {

    this.catagoryid = this.route.snapshot.queryParamMap.get('categaryid');
    this.catagoryName = this.route.snapshot.queryParamMap.get('catagoryName');
   }

  file;


  form = this.fb.group({
      file: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],

  });

  postForm() {
    //  this.showLoader();
      const formData = new FormData();
      if(this.file){
        formData.append('attachment', this.file);
      }
      
      formData.append('title', this.form.value.title);
      formData.append('body', this.form.value.description);
      formData.append('category_id', this.catagoryid);

      this.articleService.savearticle(formData).then((response: any) => {
        this.events.publish('category:changed',this.catagoryid);
       
      });

      this.navCtrl.navigateBack('/tabs/tab1');
    }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.file = file;

    }
  }
  onReady($event) {
    $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, '', this.http, this.storage);
    };
  }

  ngOnInit() {
  }

}
