import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';



export const selectAuth=
  createFeatureSelector<AuthState>('auth');

export const selectUser=createSelector(
  selectAuth,
  (state)=>state.user,
)
export const selectLoading=createSelector(
  selectAuth,
  (state)=>state.loading,
)
export const selectError=createSelector(
  selectAuth,
  (state)=>state.error,
)
export const selectIsAuth=createSelector(
  selectUser,
  (user)=>!!user
)
