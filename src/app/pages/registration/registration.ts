import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  signal,
  OnDestroy
} from '@angular/core';

import {FormsModule, NgForm, NgModel} from '@angular/forms';

import {
  debounceTime,
  switchMap,
  tap,
  EMPTY,
  catchError,
  combineLatestWith,
  Subject,
  takeUntil
} from 'rxjs';

import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/NotificationService';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registration implements AfterViewInit, OnDestroy {

  private destroy$ = new Subject<void>();

  initialUser: User = {
    name: '',
    lastName: '',
    email: '',
    password:'',
    gender: 'male',
    country: 'us',
    comment: '',
    agree: true
  };

  user: User = structuredClone(this.initialUser);

  unableSubmit = signal(false);

  @ViewChild('emailRef') emailRef!: NgModel;
  @ViewChild('userForm') userForm!: NgForm;

  constructor(
    private userService: UserService,
    private notification: NotificationService
  ) {}

  ngAfterViewInit() {
    this.emailRef.valueChanges
      ?.pipe(
        tap(() => this.unableSubmit.set(false)),

        debounceTime(1000),

        switchMap((email) => {
          if (
            this.emailRef.hasError('email') ||
            this.emailRef.hasError('required')
          ) {
            return EMPTY;
          }

          return this.userService.checkEmail(email).pipe(
            tap((emailTaken) => {
              if (emailTaken) {
                this.emailRef.control.setErrors({ emailTaken: true });
              } else {
                const errors = this.emailRef.control.errors || {};
                delete errors['emailTaken'];

                this.emailRef.control.setErrors(
                  Object.keys(errors).length ? errors : null
                );
              }
            })
          );
        }),

        catchError(() => {
          this.notification.error('Error', 'Email check failed');
          return EMPTY;
        }),

        combineLatestWith(this.userForm.statusChanges!),

        takeUntil(this.destroy$)
      )
      .subscribe(([emailTaken]) => {
        if (emailTaken) {
          this.unableSubmit.set(true);
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
      this.userService.createUser(userForm.value).subscribe({
        next: () => {
          this.notification.success('Success', 'User created');
          userForm.resetForm(this.initialUser);
        },
        error: () => {
          this.notification.error('Error', 'Creation failed');
        }
      });
    }
  }
}
