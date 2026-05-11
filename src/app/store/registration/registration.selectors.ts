import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegistrationState } from './registration.reducer';

export const selectRegistrationState =
  createFeatureSelector<RegistrationState>('registration');

export const selectEmailTaken = createSelector(
  selectRegistrationState,
  state => state.emailTaken
);

export const selectIsCheckingEmail = createSelector(
  selectRegistrationState,
  state => state.isCheckingEmail
);

export const selectIsCreatingUser = createSelector(
  selectRegistrationState,
  state => state.isCreatingUser
);

export const selectRegistrationError = createSelector(
  selectRegistrationState,
  state => state.error
);

export const selectRegistrationSuccess = createSelector(
  selectRegistrationState,
  state => state.success
);
