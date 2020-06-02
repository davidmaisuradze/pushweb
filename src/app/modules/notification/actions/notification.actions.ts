import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
  /*get list*/
  GET_NOTIFICATIONS_REQUEST = '[Notification] Get Notifications Request',
  GET_NOTIFICATIONS_SUCCESS = '[Notification] Get Notifications Success',
  GET_NOTIFICATIONS_FAILURE = '[Notification] Get Notifications Failure',

  /*create*/
  CREATE_NOTIFICATION_REQUEST = '[Notification] Create Notification Request',
  CREATE_NOTIFICATION_SUCCESS = '[Notification] Create Notification Success',
  CREATE_NOTIFICATION_FAILURE = '[Notification] Create Notification Failure',

  /*update*/
  UPDATE_NOTIFICATION_REQUEST = '[Notification] Update Notification Request',
  UPDATE_NOTIFICATION_SUCCESS = '[Notification] Update Notification Success',
  UPDATE_NOTIFICATION_FAILURE = '[Notification] Update Notification Failure',

  /*delete*/
  DELETE_NOTIFICATION_REQUEST = '[Notification] Delete Notification Request',
  DELETE_NOTIFICATION_SUCCESS = '[Notification] Delete Notification Success',
  DELETE_NOTIFICATION_FAILURE = '[Notification] Delete Notification Failure'
}

export class GetNotificationsRequest implements Action {
  readonly type = NotificationActionTypes.GET_NOTIFICATIONS_REQUEST;
}

export class GetNotificationsSuccess implements Action {
  readonly type = NotificationActionTypes.GET_NOTIFICATIONS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetNotificationsFailure implements Action {
  readonly type = NotificationActionTypes.GET_NOTIFICATIONS_FAILURE;

  constructor(public payload: any) {}
}

export class CreateNotificationRequest implements Action {
  readonly type = NotificationActionTypes.CREATE_NOTIFICATION_REQUEST;

  constructor(public payload: any) {}
}

export class CreateNotificationSuccess implements Action {
  readonly type = NotificationActionTypes.CREATE_NOTIFICATION_SUCCESS;

  constructor(public payload: any) {}
}

export class CreateNotificationFailure implements Action {
  readonly type = NotificationActionTypes.CREATE_NOTIFICATION_FAILURE;

  constructor(public payload: any) {}
}

export class UpdateNotificationRequest implements Action {
  readonly type = NotificationActionTypes.UPDATE_NOTIFICATION_REQUEST;

  constructor(public payload: any) {}
}

export class UpdateNotificationSuccess implements Action {
  readonly type = NotificationActionTypes.UPDATE_NOTIFICATION_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateNotificationFailure implements Action {
  readonly type = NotificationActionTypes.UPDATE_NOTIFICATION_FAILURE;

  constructor(public payload: any) {}
}

export class DeleteNotificationRequest implements Action {
  readonly type = NotificationActionTypes.DELETE_NOTIFICATION_REQUEST;

  constructor(public payload: { notificationId: string }) {}
}

export class DeleteNotificationSuccess implements Action {
  readonly type = NotificationActionTypes.DELETE_NOTIFICATION_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteNotificationFailure implements Action {
  readonly type = NotificationActionTypes.DELETE_NOTIFICATION_FAILURE;

  constructor(public payload: any) {}
}

export type NotificationActions =
  | GetNotificationsRequest
  | GetNotificationsSuccess
  | GetNotificationsFailure
  | CreateNotificationRequest
  | CreateNotificationSuccess
  | CreateNotificationFailure
  | UpdateNotificationRequest
  | UpdateNotificationSuccess
  | UpdateNotificationFailure
  | DeleteNotificationRequest
  | DeleteNotificationSuccess
  | DeleteNotificationFailure;
