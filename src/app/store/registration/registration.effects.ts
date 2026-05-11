import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/NotificationService';
import * as RegistrationActions from './registration.actions';

@Injectable()
export class RegistrationEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private notification = inject(NotificationService);

  checkEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.checkEmail),

      mergeMap(({ email }) =>
        this.userService.checkEmail(email).pipe(
          map(emailTaken =>
            RegistrationActions.checkEmailSuccess({ emailTaken })
          ),

          catchError(() => {
            this.notification.error('Error', 'Email check failed');

            return of(
              RegistrationActions.checkEmailFailure({
                error: 'Email check failed',
              })
            );
          })
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.createUser),

      mergeMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map(() => RegistrationActions.createUserSuccess()),

          catchError(() => {
            this.notification.error('Error', 'Creation failed');

            return of(
              RegistrationActions.createUserFailure({
                error: 'Creation failed',
              })
            );
          })
        )
      )
    )
  );

  createUserSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegistrationActions.createUserSuccess),
        tap(() => {
          this.notification.success('Success', 'User created');
        })
      ),
    { dispatch: false }
  );
}
