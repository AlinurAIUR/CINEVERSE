import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { Movie } from '../../interfaces/movie.interface';
import { Favorite } from '../../services/favorite';

import * as MoviesActions from '../../store/movies/movies.actions';

import {
  selectMovies,
  selectIsLoading,
  selectMoviesError,
  selectPage,
  selectTotalPages,
  selectVisiblePages,
  selectQuery,
  selectIsSearchMode,
} from '../../store/movies/movies.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.html',
  styleUrl: './movies.css',
  imports: [FormsModule, RouterLink, AsyncPipe],
})
export class Movies implements OnInit {
  private store = inject(Store);
  private favorite = inject(Favorite);

  queryInput = signal('');

  movies$ = this.store.select(selectMovies);
  isLoading$ = this.store.select(selectIsLoading);
  error$ = this.store.select(selectMoviesError);
  page$ = this.store.select(selectPage);
  totalPages$ = this.store.select(selectTotalPages);
  visiblePages$ = this.store.select(selectVisiblePages);
  query$ = this.store.select(selectQuery);
  isSearchMode$ = this.store.select(selectIsSearchMode);

  ngOnInit() {
    this.store.dispatch(MoviesActions.loadMovies({ page: 1 }));
  }

  goToPage(page: number, query: string, isSearchMode: boolean) {
    if (isSearchMode && query.trim()) {
      this.store.dispatch(
        MoviesActions.searchMovies({
          query,
          page,
        })
      );
    } else {
      this.store.dispatch(
        MoviesActions.loadMovies({
          page,
        })
      );
    }
  }

  nextPage(page: number, totalPages: number, query: string, isSearchMode: boolean) {
    if (page < totalPages) {
      this.goToPage(page + 1, query, isSearchMode);
    }
  }

  prevPage(page: number, query: string, isSearchMode: boolean) {
    if (page > 1) {
      this.goToPage(page - 1, query, isSearchMode);
    }
  }

  searchMovies() {
    const query = this.queryInput().trim();

    if (!query) {
      this.store.dispatch(MoviesActions.loadMovies({ page: 1 }));
      return;
    }

    this.store.dispatch(
      MoviesActions.searchMovies({
        query,
        page: 1,
      })
    );
  }

  addToFavorites(movie: Movie) {
    this.favorite.add({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      date: movie.release_date,
      rating: movie.vote_average,
      type: 'movie',
    });
  }
}
