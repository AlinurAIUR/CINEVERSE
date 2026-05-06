import {Component, inject, OnInit, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesAPI } from '../../services/moviesAPI';
import { Movie } from '../../interfaces/movie.interface';
import { NotificationService } from '../../services/NotificationService';
import {Router, RouterLink} from '@angular/router';
import { Favorite } from '../../services/favorite';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.html',
  styleUrl: './movies.css',
  imports: [FormsModule, RouterLink]
})

export class Movies implements OnInit {

  private moviesAPI = inject(MoviesAPI);
  private Notification=inject(NotificationService);
  private router = inject(Router);
  private favorite = inject(Favorite);

  movies = signal<Movie[]> ([])
  isLoading = signal(false)
  page = signal(1);
  totalPages = signal(0);
  query = signal('');
  ngOnInit() {
    this.loadMovies()
  }
  loadMovies(){
    this.isLoading.set(true);
    this.moviesAPI.getPopularMovies(this.page()).subscribe({
      next:(res) =>{
        this.movies.set(res.results)
        this.page.set(res.page)
        this.totalPages.set(res.total_pages)
        this.isLoading.set(false);

      },
  error:(err) => {
    console.error(err);
    this.Notification.error('error occurred');
        this.isLoading.set(false);
      }
    })
  }
  getPages(): number[] {
    const total = this.totalPages();
    const current = this.page();
    const pages: number[] = [];
    const start = Math.max(1, current - 3);
    const end = Math.min(total, current + 3);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
  // PAGIANTION
  goToPage(p: number) {
    this.page.set(p);
    this.loadMovies();
  }
  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
      this.loadMovies();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.loadMovies();
    }
  }
  // FAVORITES
  addToFavorites(movie: Movie) {
    this.favorite.add({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      date: movie.release_date,
      rating: movie.vote_average,
      type: 'movie'
    });
  }
  //  SEARCH
  searchMovies(){
    this.isLoading.set(true);
    this.page.set(1);
    this.moviesAPI.searchMovies(this.query(), this.page()).subscribe({
      next: (res) => {
        this.movies.set(res.results)

        this.totalPages.set(res.total_pages)
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.Notification.error('error occurred');
        this.isLoading.set(false);
      }
    })
  }


}

