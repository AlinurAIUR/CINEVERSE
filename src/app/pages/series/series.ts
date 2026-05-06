import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesAPI } from '../../services/moviesAPI';
import { Series } from '../../interfaces/series.interface';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { NotificationService } from '../../services/NotificationService';
import { Router, RouterLink } from '@angular/router';
import { Favorite } from '../../services/favorite';
@Component({
  selector: 'app-series',
  templateUrl: './series.html',
  styleUrl: './series.css',
  imports: [FormsModule, RouterLink]
})

export class Serieses implements OnInit {

  private moviesAPI = inject(MoviesAPI);
  private Notification = inject(NotificationService);
  private favorite = inject(Favorite);


  series = signal<Series[]>([])
  isLoading = signal(false)
  page = signal(1);
  totalPages = signal(0);
  query = signal('');

  ngOnInit() {
    this.loadSeries()
  }

  loadSeries() {
    this.isLoading.set(true);

    this.moviesAPI.getPopularSeries(this.page()).subscribe({
      next: (res: ApiResponse<Series>) => {
        this.series.set(res.results)
        this.page.set(res.page)
        this.totalPages.set(res.total_pages)
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.Notification.error('error occurred');
        this.isLoading.set(false);
      }
    })
  }


  //FAVORITES
  addToFavorites(series: Series) {
    this.favorite.add({
      id: series.id,
      title: series.name,
      overview: series.overview,
      poster: series.poster_path,
      date: series.first_air_date,
      rating: series.vote_average,
      type: 'series'
    });
  }
  //  PAGINATION
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
  goToPage(p: number) {
    this.page.set(p);
    this.loadSeries();
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
      this.loadSeries();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.loadSeries();
    }
  }
  //SEARCH
  searchSeries(){
    this.isLoading.set(true);
    this.page.set(1);
    this.moviesAPI.searchSeries(this.query(), this.page()).subscribe({
      next: (res) => {
        this.series.set(res.results)

        this.totalPages.set(res.total_pages)
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.Notification.error('error occurred');
        this.isLoading.set(false);
      }
    })
  }

}
