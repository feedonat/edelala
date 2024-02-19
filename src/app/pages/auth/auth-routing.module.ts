import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    children: [
      // ? /firebase/auth redirect
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/firebase-sign-in.module').then(m => m.FirebaseSignInPageModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/firebase-sign-up.module').then(m => m.FirebaseSignUpPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/firebase-profile.module').then(m => m.FirebaseProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
