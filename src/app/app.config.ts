import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

/**
 * Configuration options for the Angular application.
 */
export const appConfig: ApplicationConfig = {
  /** Providers for the application. */
  providers: [
    /** Provides routing configuration for the application. */
    provideRouter(routes),
    /** Provides client hydration for server-side rendering. */
    provideClientHydration(),
    /** Provides HTTP client configuration. */
    provideHttpClient(withFetch()),
    /** Provides native date adapter for Material components. */
    provideNativeDateAdapter(),
    /** Provides animations asynchronously for the application. */
    provideAnimationsAsync(),
    /** Provides default options for Material form field components. */
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ]
}