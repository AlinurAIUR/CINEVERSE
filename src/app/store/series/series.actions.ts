import { createAction, props } from '@ngrx/store';
import { Series } from '../../interfaces/series.interface';

export const loadSeries = createAction(
  '[Series Page] Load Series',
  props<{ page: number }>()
);

export const loadSeriesSuccess = createAction(
  '[Series API] Load Series Success',
  props<{ series: Series[]; page: number; totalPages: number }>()
);

export const loadSeriesFailure = createAction(
  '[Series API] Load Series Failure',
  props<{ error: string }>()
);

export const searchSeries = createAction(
  '[Series Page] Search Series',
  props<{ query: string; page: number }>()
);

export const searchSeriesSuccess = createAction(
  '[Series API] Search Series Success',
  props<{ series: Series[]; page: number; totalPages: number; query: string }>()
);

export const searchSeriesFailure = createAction(
  '[Series API] Search Series Failure',
  props<{ error: string }>()
);
