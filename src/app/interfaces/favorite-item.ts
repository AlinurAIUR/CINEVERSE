export interface FavoriteItem {
  id: number;
  title: string;
  overview: string;
  poster: string | null;
  date: string;
  rating: number;
  type: 'movie' | 'series';
}
