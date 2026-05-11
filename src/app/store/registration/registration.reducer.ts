import { createReducer, on } from '@ngrx/store';
import * as RegistrationActions from './registration.actions';

export interface RegistrationState {
  emailTaken: boolean;
  isCheckingEmail: boolean;
  isCreatingUser: boolean;
  error: string | null;
  success: boolean;
}

export const initialRegistrationState: RegistrationState = {
  emailTaken: false,
  isCheckingEmail: false,
  isCreatingUser: false,
  error: null,
  success: false,
};

export const registrationReducer = createReducer(
  initialRegistrationState,

  on(RegistrationActions.checkEmail, state => ({
    ...state,
    isCheckingEmail: true,
    emailTaken: false,
    error: null,
  })),

  on(RegistrationActions.checkEmailSuccess, (state, { emailTaken }) => ({
    ...state,
    isCheckingEmail: false,
    emailTaken,
  })),

  on(RegistrationActions.checkEmailFailure, (state, { error }) => ({
    ...state,
    isCheckingEmail: false,
    error,
  })),

  on(RegistrationActions.createUser, state => ({
    ...state,
    isCreatingUser: true,
    error: null,
    success: false,
  })),

  on(RegistrationActions.createUserSuccess, state => ({
    ...state,
    isCreatingUser: false,
    success: true,
  })),

  on(RegistrationActions.createUserFailure, (state, { error }) => ({
    ...state,
    isCreatingUser: false,
    error,
  })),

  on(RegistrationActions.resetRegistrationState, () => initialRegistrationState)
);
