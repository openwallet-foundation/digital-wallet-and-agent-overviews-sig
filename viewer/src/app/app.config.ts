import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideMarkdown } from 'ngx-markdown';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideNativeDateAdapter(),
    provideMarkdown({}),
    { provide: LocationStrategy, useClass: environment.locationStrategy },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    provideClientHydration(),
  ],
};
