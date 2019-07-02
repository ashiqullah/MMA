import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoalitionDeputiesPage } from './coalition-deputies.page';

const routes: Routes = [
  {
    path: '',
    component: CoalitionDeputiesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoalitionDeputiesPage]
})
export class CoalitionDeputiesPageModule {}
