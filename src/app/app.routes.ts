import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import {Registration } from './pages/registration/registration';
import {Movies} from './pages/movies/movies';
import {Serieses } from './pages/series/series';
import {Favorites} from './pages/favorites/favorites';
import { MediaCard } from './pages/MediaCard/MediaCard';

export const routes: Routes = [
  {path : 'registration', component:  Registration},
  {path : 'login',        component:  LoginComponent },
  {path : 'movies',       component:  Movies },
  {path : 'series',       component:  Serieses },
  {path : 'favorites',    component:  Favorites },
  {path : 'movie/:id',    component:  MediaCard,  data: { type: 'movie' }  },
  {path : 'series/:id',    component:  MediaCard, data: { type: 'series' } },
];
