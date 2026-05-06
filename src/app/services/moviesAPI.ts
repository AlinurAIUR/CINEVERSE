import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Movie } from '../interfaces/movie.interface';
import { Series } from '../interfaces/series.interface';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesAPI {

  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number ) {
    return this.http.get<ApiResponse<Movie>>(
      `${this.apiUrl}/movie/popular?api_key=${environment.apiKey}&language=en-US&page=${page}`
    );
  }

  getPopularSeries(page: number ) {
    return this.http.get<ApiResponse<Series>>(
      `${this.apiUrl}/tv/popular?api_key=${environment.apiKey}&language=en-US&page=${page}`
    );
  }

  searchMovies(query: string, page: number ) {
    return this.http.get<ApiResponse<Movie>>(
      `${this.apiUrl}/search/movie?api_key=${environment.apiKey}&language=us-EN&query=${query}&page=${page}`
    );
  }


  searchSeries(query: string, page: number ) {
    return this.http.get<ApiResponse<Series>>(
      `${this.apiUrl}/search/tv?api_key=${environment.apiKey}&language=us-EN&query=${query}&page=${page}`
    );
  }
  getMovieById(id: number) {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?api_key=${environment.apiKey}&language=en-US`);
  }
  getSeriesById(id: number) {
    return this.http.get<Series>(
      `${this.apiUrl}/tv/${id}?api_key=${environment.apiKey}&language=en-US`
    );
  }
}
