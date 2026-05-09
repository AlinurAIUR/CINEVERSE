import {Component, inject} from '@angular/core';

import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';

import { selectIsAuth } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',

})
export class Header {
  private store = inject(Store)

  isAuth$: Observable<boolean> = this.store.select(selectIsAuth)

  logout(){
  this.store.dispatch(AuthActions.logout());}
}
