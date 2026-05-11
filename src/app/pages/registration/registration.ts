import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  signal,
  OnDestroy,
  inject,
} from '@angular/core';

import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import {
  debounceTime,
  EMPTY,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

import { Store } from '@ngrx/store';

import { User } from '../../interfaces/user';
import * as RegistrationActions from '../../store/registration/registration.actions';

import {
  selectEmailTaken,
  selectIsCreatingUser,
  selectRegistrationSuccess,
} from '../../store/registration/registration.selectors';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registration implements AfterViewInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  initialUser: User = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    gender: 'male',
    country: 'us',
    comment: '',
    agree: true,
  };

  user: User = structuredClone(this.initialUser);

  unableSubmit = signal(false);

  emailTaken$ = this.store.select(selectEmailTaken);
  isCreatingUser$ = this.store.select(selectIsCreatingUser);
  success$ = this.store.select(selectRegistrationSuccess);

  @ViewChild('emailRef') emailRef!: NgModel;
  @ViewChild('userForm') userForm!: NgForm;

  ngAfterViewInit() {
    this.emailRef.valueChanges
      ?.pipe(
        tap(() => {
          this.unableSubmit.set(false);
          this.store.dispatch(RegistrationActions.resetRegistrationState());
        }),

        debounceTime(1000),

        tap(email => {
          if (
            this.emailRef.hasError('email') ||
            this.emailRef.hasError('required') ||
            !email
          ) {
            return;
          }

          this.store.dispatch(
            RegistrationActions.checkEmail({ email })
          );
        }),

        takeUntil(this.destroy$)
      )
      .subscribe();

    this.emailTaken$
      .pipe(takeUntil(this.destroy$))
      .subscribe(emailTaken => {
        if (emailTaken) {
          this.emailRef.control.setErrors({ emailTaken: true });
          this.unableSubmit.set(true);
        } else {
          const errors = this.emailRef.control.errors || {};
          delete errors['emailTaken'];

          this.emailRef.control.setErrors(
            Object.keys(errors).length ? errors : null
          );
        }
      });

    this.success$
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          this.userForm.resetForm(this.initialUser);
          this.store.dispatch(RegistrationActions.resetRegistrationState());
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkFieldStatus(field: NgModel) {
    return field.invalid && (field.dirty || field.touched);
  }

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.store.dispatch(
        RegistrationActions.createUser({
          user: userForm.value,
        })
      );
    }
  }
}
