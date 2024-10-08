import { Routes } from '@angular/router';
import { WalletsListComponent } from './wallets/wallets-list/wallets-list.component';
import { WalletsShowComponent } from './wallets/wallets-show/wallets-show.component';
import { CaseStudiesListComponent } from './case-studies/case-studies-list/case-studies-list.component';
import { CaseStudiesShowComponent } from './case-studies/case-studies-show/case-studies-show.component';
import { DependenciesListComponent } from './dependencies/dependencies-list/dependencies-list.component';
import { DependenciesShowComponent } from './dependencies/dependencies-show/dependencies-show.component';
import { HomeComponent } from './home/home.component';
import { SeoResolver } from './seo-resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Wallet and Agent Overview' },
  },
  {
    path: 'wallets',
    children: [
      {
        path: '',
        component: WalletsListComponent,
        data: { title: 'Wallets' },
      },
      {
        path: ':id',
        component: WalletsShowComponent,
        resolve: { seo: SeoResolver },
      },
    ],
  },
  {
    path: 'case-studies',
    children: [
      {
        path: '',
        component: CaseStudiesListComponent,
        data: { title: 'Case Studies' },
      },
      {
        path: ':id',
        component: CaseStudiesShowComponent,
        resolve: { seo: SeoResolver },
      },
    ],
  },
  {
    path: 'dependencies',
    children: [
      {
        path: '',
        component: DependenciesListComponent,
        data: { title: 'Dependencies' },
      },
      {
        path: ':id',
        component: DependenciesShowComponent,
        resolve: { seo: SeoResolver },
      },
    ],
  },
];
