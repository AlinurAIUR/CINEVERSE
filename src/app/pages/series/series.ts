import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { Series } from '../../interfaces/series.interface';
import { Favorite } from '../../services/favorite';

import * as SeriesActions from '../../store/series/series.actions';

import {
  selectSeries,
  selectSeriesLoading,
  selectSeriesError,
  selectSeriesPage,
  selectSeriesTotalPages,
  selectSeriesQuery,
  selectSeriesIsSearchMode,
  selectSeriesVisiblePages,
} from '../../store/series/series.selectors';

@Component({
  selector: 'app-series',
  templateUrl: './series.html',
  styleUrl: './series.css',
  imports: [FormsModule, RouterLink, AsyncPipe],
})
export class Serieses implements OnInit {
  private store = inject(Store);
  private favorite = inject(Favorite);

  queryInput = signal('');

  series$ = this.store.select(selectSeries);
  isLoading$ = this.store.select(selectSeriesLoading);
  error$ = this.store.select(selectSeriesError);
  page$ = this.store.select(selectSeriesPage);
  totalPages$ = this.store.select(selectSeriesTotalPages);
  query$ = this.store.select(selectSeriesQuery);
  isSearchMode$ = this.store.select(selectSeriesIsSearchMode);
  visiblePages$ = this.store.select(selectSeriesVisiblePages);

  ngOnInit() {
    this.store.dispatch(SeriesActions.loadSeries({ page: 1 }));
  }

  goToPage(page: number, query: string, isSearchMode: boolean) {
    if (isSearchMode && query.trim()) {
      this.store.dispatch(
        SeriesActions.searchSeries({
          query,
          page,
        })
      );
    } else {
      this.store.dispatch(
        SeriesActions.loadSeries({
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

  searchSeries() {
    const query = this.queryInput().trim();

    if (!query) {
      this.store.dispatch(SeriesActions.loadSeries({ page: 1 }));
      return;
    }

    this.store.dispatch(
      SeriesActions.searchSeries({
        query,
        page: 1,
      })
    );
  }

  addToFavorites(series: Series) {
    this.favorite.add({
      id: series.id,
      title: series.name,
      overview: series.overview,
      poster: series.poster_path,
      date: series.first_air_date,
      rating: series.vote_average,
      type: 'series',
    });
  }
}
