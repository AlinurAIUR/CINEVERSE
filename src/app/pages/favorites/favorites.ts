import { Component, inject } from '@angular/core';
import { Favorite } from '../../services/favorite';
import {FavoriteItem} from '../../interfaces/favorite-item';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',


})
export class Favorites {

  private favorite = inject(Favorite);

  favorites = this.favorite.favorites;

  remove(item: FavoriteItem) {
    this.favorite.remove(item.id, item.type);
  }
}
