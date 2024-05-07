import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentalPage } from './rental.page';

const routes: Routes = [
  {
    path: 'list',
    component: RentalPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  },

  {
    path: '',
        redirectTo: 'new',
        pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalPageRoutingModule {}
