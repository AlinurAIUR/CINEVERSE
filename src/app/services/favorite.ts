import { Injectable, signal, effect } from '@angular/core';
import { FavoriteItem } from '../interfaces/favorite-item';

@Injectable({
  providedIn: 'root'
})
export class Favorite {

  favorites = signal<FavoriteItem[]>([]);

  constructor() {
    // загрузка из localStorage
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites.set(JSON.parse(saved));
    }

    // авто-сохранение
    effect(() => {
      localStorage.setItem('favorites', JSON.stringify(this.favorites()));
    });
  }

  add(item: FavoriteItem) {
    const exists = this.favorites().some(
      f => f.id === item.id && f.type === item.type
    );

    if (!exists) {
      this.favorites.update(f => [...f, item]) // spread operator
    }
  }

  remove(id: number, type: 'movie' | 'series') {
    this.favorites.update(f =>
      f.filter(item => !(item.id === id && item.type === type))
    );
  }
}
