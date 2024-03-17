import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { SettingMenuComponent } from './setting-menu/setting-menu.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage

  },
    
  {
    path: 'signin',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
