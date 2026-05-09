import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class Auth{
  private currentUser: User | null = null;

  login(user: User) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  getUser() {
    if (!this.currentUser) {
      const data = localStorage.getItem('user');
      this.currentUser = data ? JSON.parse(data) : null;
    }
    return this.currentUser;
  }

  isAuth(): boolean {
    return !!this.getUser();
  }
}
