import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthSelectors } from '../auth';

export const selectError: MemoizedSelector<object, any> = createSelector(
  AuthSelectors.selectAuthError,
  (authError: string) => {
    return authError;
  }
);

export const selecLoading: MemoizedSelector<object, boolean> = createSelector(
  AuthSelectors.selectAuthLoading,
  (authLoading: boolean) => {
    return authLoading;
  }
);
