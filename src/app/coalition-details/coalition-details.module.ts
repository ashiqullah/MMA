import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AccordionComponent } from '../components/accordion/accordion';

import { CoalitionDetailsPage } from './coalition-details.page';

const routes: Routes = [
  {
    path: '',
    component: CoalitionDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoalitionDetailsPage,AccordionComponent]
})
export class CoalitionDetailsPageModule {}
