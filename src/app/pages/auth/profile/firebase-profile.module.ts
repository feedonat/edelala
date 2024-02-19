import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { redirectUnauthorizedTo, canActivate, AuthPipe } from '@angular/fire/auth-guard';
import { FirebaseProfilePage } from './firebase-profile.page';



const redirectUnauthorizedToLogin: () => AuthPipe = () => redirectUnauthorizedTo(['/setting/auth/sign-in']);

const routes: Routes = [
  {
    path: '',
    component: FirebaseProfilePage,
    resolve: {
      //data: FirebaseProfileResolver
    },
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    FirebaseProfilePage
  ],
  providers: [
    //FirebaseProfileResolver
  ]
})
export class FirebaseProfilePageModule {}
