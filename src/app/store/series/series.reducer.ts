import { createReducer, on } from '@ngrx/store';
import { Series } from '../../interfaces/series.interface';
import * as SeriesActions from './series.actions';

export interface SeriesState {
  series: Series[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  query: string;
  isSearchMode: boolean;
}

export const initialSeriesState: SeriesState = {
  series: [],
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 0,
  query: '',
  isSearchMode: false,
};

export const seriesReducer = createReducer(
  initialSeriesState,

  on(SeriesActions.loadSeries, (state, { page }) => ({
    ...state,
    isLoading: true,
    error: null,
    page,
    query: '',
    isSearchMode: false,
  })),

  on(SeriesActions.loadSeriesSuccess, (state, { series, page, totalPages }) => ({
    ...state,
    series,
    page,
    totalPages,
    isLoading: false,
  })),

  on(SeriesActions.loadSeriesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(SeriesActions.searchSeries, (state, { query, page }) => ({
    ...state,
    isLoading: true,
    error: null,
    query,
    page,
    isSearchMode: true,
  })),

  on(SeriesActions.searchSeriesSuccess, (state, { series, page, totalPages, query }) => ({
    ...state,
    series,
    page,
    totalPages,
    query,
    isLoading: false,
    isSearchMode: true,
  })),

  on(SeriesActions.searchSeriesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
