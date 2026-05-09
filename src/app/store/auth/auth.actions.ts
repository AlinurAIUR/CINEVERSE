import {createAction,props} from '@ngrx/store';
import {User} from '../../interfaces/user'

// all for login
export const login = createAction(
  '[Auth] login',
  props<{email: string, password:string}>(),
);

export const loginSuccess = createAction(
  '[Auth] login success',
  props<{user : User}>(),
);
export const loginFailure = createAction(
  '[Auth] login failure',
  props<{error : string}>(),
);
// for header
export const logout = createAction(
  '[Auth] Logout'
);
