import { Routes } from '@angular/router';
import { WalletsListComponent } from './wallets/wallets-list/wallets-list.component';
import { WalletsShowComponent } from './wallets/wallets-show/wallets-show.component';
import { CaseStudiesListComponent } from './case-studies/case-studies-list/case-studies-list.component';
import { CaseStudiesShowComponent } from './case-studies/case-studies-show/case-studies-show.component';
import { DependenciesListComponent } from './dependencies/dependencies-list/dependencies-list.component';
import { DependenciesShowComponent } from './dependencies/dependencies-show/dependencies-show.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'wallets',
    children: [
      {
        path: '',
        component: WalletsListComponent,
      },
      {
        path: ':id',
        component: WalletsShowComponent,
      },
    ],
  },
  {
    path: 'case-studies',
    children: [
      {
        path: '',
        component: CaseStudiesListComponent,
      },
      {
        path: ':id',
        component: CaseStudiesShowComponent,
      },
    ],
  },
  {
    path: 'dependencies',
    children: [
      {
        path: '',
        component: DependenciesListComponent,
      },
      {
        path: ':id',
        component: DependenciesShowComponent,
      },
    ],
  },
];
