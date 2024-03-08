import { Routes } from '@angular/router';
import { WalletsListComponent } from './wallets-list/wallets-list.component';
import { WalletsShowComponent } from './wallets-show/wallets-show.component';

export const routes: Routes = [
  {
    path: '',
    component: WalletsListComponent,
  },
  {
    path: ':id',
    component: WalletsShowComponent,
  },
];
