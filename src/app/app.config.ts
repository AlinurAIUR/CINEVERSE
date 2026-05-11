import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { exampleInterceptor } from './interceptors/example-interceptor';

import { authReducer } from './store/auth/auth.reducer';
import { AuthEffect } from './store/auth/auth.effects';
import {MoviesEffects} from './store/movies/movies.effects';
import {moviesReducer} from './store/movies/movies.reducer';
import {seriesReducer} from './store/series/series.reducer';
import {SeriesEffects} from './store/series/series.effects';
import {registrationReducer} from './store/registration/registration.reducer';
import { RegistrationEffects } from './store/registration/registration.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([exampleInterceptor])
    ),

    provideAnimations(),

    provideToastr(),

    provideStore({
      auth: authReducer,
      movies: moviesReducer,
      series: seriesReducer,
      registration: registrationReducer,
    }),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),

    provideEffects([
      AuthEffect,
      MoviesEffects,
      SeriesEffects,
      RegistrationEffects,

    ]),
  ],
};
