import { State } from '../reducers/website.reducers';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

const getWebsites = (state: State) => state.websites;

export const selectWebsitesState: MemoizedSelector<object, State> = createFeatureSelector<State>(
  'websites'
);

export const selectWebsites: MemoizedSelector<object, any> = createSelector(
  selectWebsitesState,
  getWebsites
);
