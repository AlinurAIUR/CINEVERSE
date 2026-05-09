import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';

import { UserService } from '../../services/user.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffect {

  private actions$ = inject(Actions);
  private userService = inject(UserService);

  login$ = createEffect(() =>
    this.actions$.pipe(

      ofType(AuthActions.login),

      switchMap(({ email, password }) =>
        this.userService.getUsers().pipe(

          map(users => {
            const user = users.find(u =>
              u.email === email &&
              u.password === password
            );

            if (user) {
              localStorage.setItem('user', JSON.stringify(user));

              return AuthActions.loginSuccess({ user });
            }

            return AuthActions.loginFailure({
              error: 'Invalid credentials'
            });
          }),

          catchError(() =>
            of(AuthActions.loginFailure({
              error: 'Server error'
            }))
          )
        )
      )
    )
  );
// header
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        map(() => {
          localStorage.removeItem('user');
        })
      ),
    { dispatch: false }
  );
}
