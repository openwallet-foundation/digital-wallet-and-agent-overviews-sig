import { Routes } from '@angular/router';
import { SeoResolver } from './seo-resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    data: { title: 'Wallet and Agent Overview' },
  },
  {
    path: 'wallets',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./wallets/wallets-list/wallets-list.component').then(
            (m) => m.WalletsListComponent
          ),
        data: { title: 'Wallets' },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./wallets/wallets-show/wallets-show.component').then(
            (m) => m.WalletsShowComponent
          ),
        resolve: { seo: SeoResolver },
      },
    ],
  },
  {
    path: 'case-studies',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './case-studies/case-studies-list/case-studies-list.component'
          ).then((m) => m.CaseStudiesListComponent),
        data: { title: 'Case Studies' },
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './case-studies/case-studies-show/case-studies-show.component'
          ).then((m) => m.CaseStudiesShowComponent),
        resolve: { seo: SeoResolver },
      },
    ],
  },
  {
    path: 'dependencies',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './dependencies/dependencies-list/dependencies-list.component'
          ).then((m) => m.DependenciesListComponent),
        data: { title: 'Dependencies' },
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './dependencies/dependencies-show/dependencies-show.component'
          ).then((m) => m.DependenciesShowComponent),
        resolve: { seo: SeoResolver },
      },
    ],
  },
  {
    path: 'credential-profiles',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './credential-profiles/credential-profile-list/credential-profile-list.component'
          ).then((m) => m.CredentialProfileListComponent),
        data: { title: 'Credential Profiles' },
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './credential-profiles/credential-profile-show/credential-profile-show.component'
          ).then((m) => m.CredentialProfileShowComponent),
        resolve: { seo: SeoResolver },
      },
    ],
  },
  {
    path: 'resources/:resource',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./resources/resources-list/resources-list.component').then(
            (m) => m.ResourcesListComponent
          ),
        resolve: { seo: SeoResolver },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./resources/resources-show/resources-show.component').then(
            (m) => m.ResourcesShowComponent
          ),
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
        loadComponent: () =>
          import('./definition/definition.component').then(
            (m) => m.DefinitionComponent
          ),
      },
      {
        path: ':resource',
        loadComponent: () =>
          import('./definition/definition.component').then(
            (m) => m.DefinitionComponent
          ),
      },
      {
        path: ':resource/:id',
        loadComponent: () =>
          import('./definition/definition.component').then(
            (m) => m.DefinitionComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
