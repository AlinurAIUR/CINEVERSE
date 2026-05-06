import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesAPI } from '../../services/moviesAPI';
import { Movie } from '../../interfaces/movie.interface';
import { Series } from '../../interfaces/series.interface';
import { NotificationService } from '../../services/NotificationService';

@Component({
  selector: 'app-media-card',
  templateUrl: './MediaCard.html',
  styleUrl: './MediaCard.css'
})
export class MediaCard implements OnInit {

  private route = inject(ActivatedRoute);
  private api = inject(MoviesAPI);
  private notification = inject(NotificationService);

  id!: number;
  type!: 'movie' | 'series';

  data = signal<Movie | Series | null>(null);

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.type = this.route.snapshot.data['type'];

    if (this.type === 'movie') {
      this.api.getMovieById(this.id).subscribe({
        next: (res) => this.data.set(res),
        error: () => this.notification.error('Error', 'Movie load failed')
          //complete если поток бесконечный interval(), fromEvent()
      });
    } else {
      this.api.getSeriesById(this.id).subscribe({
        next: (res) => this.data.set(res),
        error: () => this.notification.error('Error', 'Series load failed')
      });
    }

  }
  isMovie(): boolean {
    return this.type === 'movie';
  }
  get movie(): Movie | null {
    return this.type === 'movie' ? this.data() as Movie : null; // тернарный оператор
  }

  get series(): Series | null {
    return this.type === 'series' ? this.data() as Series : null;
  }

}
