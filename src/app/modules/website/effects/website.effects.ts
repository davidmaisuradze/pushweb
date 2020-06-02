import { Injectable } from '@angular/core';
import { WebsiteService } from '../../../core/services/website.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  CreateWebsiteFailure,
  CreateWebsiteRequest,
  CreateWebsiteSuccess,
  DeleteWebsiteFailure,
  DeleteWebsiteRequest,
  DeleteWebsiteSuccess,
  GetWebsitesFailure,
  GetWebsitesRequest,
  GetWebsitesSuccess,
  UpdateWebsiteFailure,
  UpdateWebsiteRequest,
  UpdateWebsiteSuccess,
  WebsiteActionTypes
} from '../actions/website.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { DialogClose } from '../../dialog/actions/dialog.actions';

@Injectable()
export class WebsiteEffects {
  constructor(private websiteService: WebsiteService, private actions$: Actions) {}

  @Effect()
  getWebsitesRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<GetWebsitesRequest>(WebsiteActionTypes.GET_WEBSITES_REQUEST),
    switchMap(action =>
      this.websiteService.getWebsites().pipe(
        map(websites => new GetWebsitesSuccess(websites)),
        catchError(error => of(new GetWebsitesFailure(error)))
      )
    )
  );

  @Effect()
  createWebsiteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<CreateWebsiteRequest>(WebsiteActionTypes.CREATE_WEBSITE_REQUEST),
    switchMap(action =>
      this.websiteService.addNewWebsite(action.payload).pipe(
        mergeMap(result => [new CreateWebsiteSuccess(result), new DialogClose()]),
        catchError(error => of(new CreateWebsiteFailure(error)))
      )
    )
  );

  @Effect()
  updateWebsiteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateWebsiteRequest>(WebsiteActionTypes.UPDATE_WEBSITE_REQUEST),
    switchMap(action =>
      this.websiteService.updateWebsite(action.payload).pipe(
        mergeMap(result => [new UpdateWebsiteSuccess(result), new DialogClose()]),
        catchError(error => of(new UpdateWebsiteFailure(error)))
      )
    )
  );

  @Effect()
  deleteWebsiteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteWebsiteRequest>(WebsiteActionTypes.DELETE_WEBSITE_REQUEST),
    switchMap(action =>
      this.websiteService.deleteWebsite(action.payload.websiteId).pipe(
        map(result => new DeleteWebsiteSuccess(result)),
        catchError(error => of(new DeleteWebsiteFailure(error)))
      )
    )
  );
}
