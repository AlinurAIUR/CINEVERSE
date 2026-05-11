import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SeriesState } from './series.reducer';

export const selectSeriesState =
  createFeatureSelector<SeriesState>('series');

export const selectSeries = createSelector(
  selectSeriesState,
  state => state.series
);

export const selectSeriesLoading = createSelector(
  selectSeriesState,
  state => state.isLoading
);

export const selectSeriesError = createSelector(
  selectSeriesState,
  state => state.error
);

export const selectSeriesPage = createSelector(
  selectSeriesState,
  state => state.page
);

export const selectSeriesTotalPages = createSelector(
  selectSeriesState,
  state => state.totalPages
);

export const selectSeriesQuery = createSelector(
  selectSeriesState,
  state => state.query
);

export const selectSeriesIsSearchMode = createSelector(
  selectSeriesState,
  state => state.isSearchMode
);

export const selectSeriesVisiblePages = createSelector(
  selectSeriesPage,
  selectSeriesTotalPages,
  (current, total) => {
    const pages: number[] = [];

    const start = Math.max(1, current - 3);
    const end = Math.min(total, current + 3);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
);
