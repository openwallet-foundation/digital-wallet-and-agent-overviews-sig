import { Routes } from '@angular/router';
import { WalletsListComponent } from './wallets/wallets-list/wallets-list.component';
import { WalletsShowComponent } from './wallets/wallets-show/wallets-show.component';
import { CaseStudiesListComponent } from './case-studies/case-studies-list/case-studies-list.component';
import { CaseStudiesShowComponent } from './case-studies/case-studies-show/case-studies-show.component';
import { DependenciesListComponent } from './dependencies/dependencies-list/dependencies-list.component';
import { DependenciesShowComponent } from './dependencies/dependencies-show/dependencies-show.component';
import { HomeComponent } from './home/home.component';
import { SeoResolver } from './seo-resolver';
import { CredentialProfileListComponent } from './credential-profiles/credential-profile-list/credential-profile-list.component';
import { CredentialProfileShowComponent } from './credential-profiles/credential-profile-show/credential-profile-show.component';
import { ResourcesListComponent } from './resources/resources-list/resources-list.component';
import { ResourcesShowComponent } from './resources/resources-show/resources-show.component';
import { DefinitionComponent } from './definition/definition.component';

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
  {
    path: 'credential-profiles',
    children: [
      {
        path: '',
        component: CredentialProfileListComponent,
        data: { title: 'Credential Profiles' },
      },
      {
        path: ':id',
        component: CredentialProfileShowComponent,
        resolve: { seo: SeoResolver },
      },
    ],
  },
  {
    path: 'resources/:resource',
    children: [
      {
        path: '',
        component: ResourcesListComponent,
        resolve: { seo: SeoResolver },
      },
      {
        path: ':id',
        component: ResourcesShowComponent,
        resolve: { seo: SeoResolver },
      },
    ],
  },
  {
    path: 'definitions',
    data: { title: 'Definitions' },
    children: [
      {
        path: '',
        component: DefinitionComponent,
      },
      {
        path: ':resource',
        component: DefinitionComponent,
      },
      {
        path: ':resource/:id',
        component: DefinitionComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
