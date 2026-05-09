import {createReducer, on} from '@ngrx/store';

import * as AuthActions  from './auth.actions';

import {initialState} from './auth.state';

export const authReducer = createReducer(

  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading:true,
    error:null,
  })),
  on(AuthActions.loginSuccess, (state,{user})=>({
    ...state,
    user,
    loading:false,
  })),
  on(AuthActions.loginFailure, (state,{error})=>({
    ...state,
    error,
    loading:false,
  })),
  // logout in header
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    loading: false,
    error: null,
  }))
  )
