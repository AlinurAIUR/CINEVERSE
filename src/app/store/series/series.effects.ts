import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { MoviesAPI } from '../../services/moviesAPI';
import { NotificationService } from '../../services/NotificationService';
import * as SeriesActions from './series.actions';

@Injectable()
export class SeriesEffects {
  private actions$ = inject(Actions);
  private moviesAPI = inject(MoviesAPI);
  private notification = inject(NotificationService);

  loadSeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeriesActions.loadSeries),

      mergeMap(({ page }) =>
        this.moviesAPI.getPopularSeries(page).pipe(
          map(res =>
            SeriesActions.loadSeriesSuccess({
              series: res.results,
              page: res.page,
              totalPages: res.total_pages,
            })
          ),

          catchError(err => {
            console.log(err);
            this.notification.error('error occurred');

            return of(
              SeriesActions.loadSeriesFailure({
                error: 'Failed to load series',
              })
            );
          })
        )
      )
    )
  );

  searchSeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeriesActions.searchSeries),

      mergeMap(({ query, page }) =>
        this.moviesAPI.searchSeries(query, page).pipe(
          map(res =>
            SeriesActions.searchSeriesSuccess({
              series: res.results,
              page: res.page,
              totalPages: res.total_pages,
              query,
            })
          ),

          catchError(err => {
            console.log(err);
            this.notification.error('error occurred');

            return of(
              SeriesActions.searchSeriesFailure({
                error: 'Failed to search series',
              })
            );
          })
        )
      )
    )
  );
}
