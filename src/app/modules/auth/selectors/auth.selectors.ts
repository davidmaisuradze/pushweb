import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../../../shared/models/User';
import { State } from '../reducers/auth.reducer';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getUser = (state: State): any => state.user;

export const selectAuthState: MemoizedSelector<object, State> = createFeatureSelector<State>(
  'auth'
);

export const selectAuthError: MemoizedSelector<object, any> = createSelector(
  selectAuthState,
  getError
);

export const selectAuthLoading: MemoizedSelector<object, boolean> = createSelector(
  selectAuthState,
  getIsLoading
);

export const selectAuthUser: MemoizedSelector<object, User> = createSelector(
  selectAuthState,
  getUser
);
