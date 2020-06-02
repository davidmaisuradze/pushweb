import { State } from '../reducers/notification.reducers';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

const getNotifications = (state: State) => state.notifications;

export const selectNotificationsState: MemoizedSelector<object, State> = createFeatureSelector<
  State
>('notifications');

export const selectNotifications: MemoizedSelector<object, any> = createSelector(
  selectNotificationsState,
  getNotifications
);
