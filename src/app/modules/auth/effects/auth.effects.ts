import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AuthModuleService } from '../../../core/services/auth-module.service';
import {
  AuthActionTypes,
  LoginFailureAction,
  LoginRequestAction,
  LoginSuccessAction
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthModuleService, private actions$: Actions) {}

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<LoginRequestAction>(AuthActionTypes.LOGIN_REQUEST),
    switchMap(action =>
      this.authService.login().pipe(
        map(
          user =>
            new LoginSuccessAction({
              user
            })
        ),
        catchError(error => observableOf(new LoginFailureAction({ error })))
      )
    )
  );
}
