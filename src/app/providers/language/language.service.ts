import { Injectable } from '@angular/core';
import { LanguageModel } from '../../models/language.model';

@Injectable()
export class LanguageService {
  languages: Array<LanguageModel> = new Array<LanguageModel>();

   constructor() {
     this.languages.push(
       {name: 'English', code: 'en'},
       {name: 'دری', code: 'fa'},
       {name: 'پښتو', code: 'ps'}
     );
   }

   getLanguages() {
     return this.languages;
   }
 }
