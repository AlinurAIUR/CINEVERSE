import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private store = inject(Store);

  loginData = {
    email: '',
    password: '',
  };

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.store.dispatch(
      AuthActions.login({
        email: this.loginData.email,
        password: this.loginData.password,
      })
    );
  }
}
