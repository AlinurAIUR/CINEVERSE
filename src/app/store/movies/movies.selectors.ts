import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './movies.reducer';


export const selectMoviesState =
  createFeatureSelector<MoviesState>('movies');

export const selectMovies = createSelector(
  selectMoviesState,
  state => state.movies
);

export const selectIsLoading = createSelector(
  selectMoviesState,
  state => state.isLoading
);

export const selectMoviesError= createSelector(
  selectMoviesState,
  state => state.error
);

export const selectPage = createSelector(
  selectMoviesState,
  state => state.page
);
export const selectTotalPages = createSelector(
  selectMoviesState,
  state => state.totalPages
);

export const selectQuery = createSelector(
  selectMoviesState,
  state => state.query
);

export const selectIsSearchMode = createSelector(
  selectMoviesState,
  state => state.isSearchMode
);
//derived state
export const selectVisiblePages = createSelector(
  selectPage,
  selectTotalPages,
  (current,total)=>{
    const pages:number[] = [];
    const start =Math.max(1,current-3)
    const end = Math.min(total,current+3)

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
)
