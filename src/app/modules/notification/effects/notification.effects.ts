import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  CreateNotificationFailure,
  CreateNotificationRequest,
  CreateNotificationSuccess,
  DeleteNotificationFailure,
  DeleteNotificationRequest,
  DeleteNotificationSuccess,
  GetNotificationsFailure,
  GetNotificationsRequest,
  GetNotificationsSuccess,
  NotificationActionTypes, UpdateNotificationFailure, UpdateNotificationRequest, UpdateNotificationSuccess
} from '../actions/notification.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { DialogClose } from '../../dialog/actions/dialog.actions';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable()
export class NotificationEffects {
  constructor(private notificationService: NotificationService, private actions$: Actions) {}

  @Effect()
  getNotificationsRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<GetNotificationsRequest>(NotificationActionTypes.GET_NOTIFICATIONS_REQUEST),
    switchMap(action =>
      this.notificationService.getNotifications().pipe(
        map(websites => new GetNotificationsSuccess(websites)),
        catchError(error => of(new GetNotificationsFailure(error)))
      )
    )
  );

  @Effect()
  createNotificationRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<CreateNotificationRequest>(NotificationActionTypes.CREATE_NOTIFICATION_REQUEST),
    switchMap(action =>
      this.notificationService.addNewNotification(action.payload).pipe(
        mergeMap(result => [new CreateNotificationSuccess(result), new DialogClose()]),
        catchError(error => of(new CreateNotificationFailure(error)))
      )
    )
  );

  @Effect()
  updateNotificationRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateNotificationRequest>(NotificationActionTypes.UPDATE_NOTIFICATION_REQUEST),
    switchMap(action =>
      this.notificationService.updateNotification(action.payload).pipe(
        mergeMap(result => [new UpdateNotificationSuccess(result), new DialogClose()]),
        catchError(error => of(new UpdateNotificationFailure(error)))
      )
    )
  );

  @Effect()
  deleteNotificationRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteNotificationRequest>(NotificationActionTypes.DELETE_NOTIFICATION_REQUEST),
    switchMap(action =>
      this.notificationService.deleteNotification(action.payload.notificationId).pipe(
        map(result => new DeleteNotificationSuccess(result)),
        catchError(error => of(new DeleteNotificationFailure(error)))
      )
    )
  );
}
