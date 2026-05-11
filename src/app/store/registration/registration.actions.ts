import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user';

export const checkEmail = createAction(
  '[Registration Page] Check Email',
  props<{ email: string }>()
);

export const checkEmailSuccess = createAction(
  '[Registration API] Check Email Success',
  props<{ emailTaken: boolean }>()
);

export const checkEmailFailure = createAction(
  '[Registration API] Check Email Failure',
  props<{ error: string }>()
);

export const createUser = createAction(
  '[Registration Page] Create User',
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  '[Registration API] Create User Success'
);

export const createUserFailure = createAction(
  '[Registration API] Create User Failure',
  props<{ error: string }>()
);

export const resetRegistrationState = createAction(
  '[Registration Page] Reset State'
);
