import { createAction, props } from '@ngrx/store';
import { Movie } from '../../interfaces/movie.interface';


export const loadMovies = createAction(
  '[Movies Page] Load Movies',
  props< {page:number} >()
)
export const loadMoviesSuccess = createAction(
  '[Movies API] Load Movies Success',
  props< { movies: Movie[]; page:number; totalPages:number } >()
)
export const loadMoviesFailure = createAction(
  '[Movies API] Load Movies Failure',
  props< { error:string } >()
)
export const searchMovies = createAction(
  '[Movies page] Search Movies',
  props< { query:string; page:number } >()
)
export const searchMoviesSuccess = createAction(
  '[Movies API] Search Movies Success',
  props<{ movies: Movie[]; page: number; totalPages: number; query: string }>()
);

export const searchMoviesFailure = createAction(
  '[Movies API] Search Movies Failure',
  props<{ error: string }>()
);
