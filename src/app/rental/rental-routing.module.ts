import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentalPage } from './rental.page';

const routes: Routes = [
  {
    path: '1',
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
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalPageRoutingModule {}
