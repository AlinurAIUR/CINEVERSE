import { createReducer, on } from '@ngrx/store';
import { Movie } from '../../interfaces/movie.interface';
import * as MoviesActions from './movies.actions';


export interface MoviesState {
  movies: Movie[];
  page: number;
  totalPages: number;

  query: string;
  isSearchMode: boolean;

  isLoading: boolean;
  error: string | null;
}
export const initialMoviesState: MoviesState = {
  movies: [],
  page: 1,
  totalPages: 0,

  query: '',
  isSearchMode: false,

  isLoading: false,
  error: null,
}

export const moviesReducer = createReducer(
  initialMoviesState,

  on(MoviesActions.loadMovies,(state,{page})=> ({
    ...state,
    isLoading:true,
    error:null,
    page,
    query:'',
    isSearchMode:false,
    })
  ),
  on(MoviesActions.loadMoviesSuccess,(state,{movies,page,totalPages})=> ({
    ...state,
    movies,
    page,
    totalPages,
    isLoading:false,
  })
  ),
  on(MoviesActions.loadMoviesFailure,(state,{ error }) => ({
    ...state,
    isLoading:false,
  })
  ),

  on(MoviesActions.searchMovies,(state,{query,page})=> ({
    ...state,
    isLoading:true,
    error:null,
    page,
    query,
    isSearchMode:true,
  })
  ),
  on(MoviesActions.searchMoviesSuccess,(state,{movies,page,totalPages,query})=> ({
    ...state,
    movies,
    page,
    totalPages,
    query,
    isLoading:false,
    isSearchMode:true,
  })
  ),
  on(MoviesActions.searchMoviesFailure,(state,{ error }) => ({
    ...state,
    error,
    isLoading:false,
  }))

)
