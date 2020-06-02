import { Action } from '@ngrx/store';
import { User } from '../../../shared/models/User';

export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth] Login Request',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGIN_SUCCESS = '[Auth] Login Success'
}

export class LoginRequestAction implements Action {
  readonly type = AuthActionTypes.LOGIN_REQUEST;

  constructor(public payload: { userName: string; password: string }) {}
}

export class LoginFailureAction implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: { error: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export type AuthActions = LoginRequestAction | LoginFailureAction | LoginSuccessAction;
