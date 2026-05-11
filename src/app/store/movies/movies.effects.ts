import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { MoviesAPI } from '../../services/moviesAPI';
import { NotificationService } from '../../services/NotificationService';
import * as MoviesActions from './movies.actions';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private moviesAPI = inject(MoviesAPI);
  private notification = inject(NotificationService);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),

      mergeMap(({ page }) =>
        this.moviesAPI.getPopularMovies(page).pipe(
          map(res =>
            MoviesActions.loadMoviesSuccess({
              movies: res.results,
              page: res.page,
              totalPages: res.total_pages,
            })
          ),

          catchError(err => {
            console.error(err);
            this.notification.error('error occurred');

            return of(
              MoviesActions.loadMoviesFailure({
                error: 'Failed to load movies',
              })
            );
          })
        )
      )
    )
  );

  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.searchMovies),

      mergeMap(({ query, page }) =>
        this.moviesAPI.searchMovies(query, page).pipe(
          map(res =>
            MoviesActions.searchMoviesSuccess({
              movies: res.results,
              page: res.page,
              totalPages: res.total_pages,
              query,
            })
          ),

          catchError(err => {
            console.error(err);
            this.notification.error('error occurred');

            return of(
              MoviesActions.searchMoviesFailure({
                error: 'Failed to search movies',
              })
            );
          })
        )
      )
    )
  );
}
