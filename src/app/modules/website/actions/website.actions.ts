import { Action } from '@ngrx/store';

export enum WebsiteActionTypes {
  /*get list*/
  GET_WEBSITES_REQUEST = '[Website] Get Websites Request',
  GET_WEBSITES_SUCCESS = '[Website] Get Websites Success',
  GET_WEBSITES_FAILURE = '[Website] Get Websites Failure',

  /*create*/
  CREATE_WEBSITE_REQUEST = '[Website] Create Website Request',
  CREATE_WEBSITE_SUCCESS = '[Website] Create Website Success',
  CREATE_WEBSITE_FAILURE = '[Website] Create Website Failure',

  /*create*/
  UPDATE_WEBSITE_REQUEST = '[Website] Update Website Request',
  UPDATE_WEBSITE_SUCCESS = '[Website] Update Website Success',
  UPDATE_WEBSITE_FAILURE = '[Website] Update Website Failure',

  /*delete*/
  DELETE_WEBSITE_REQUEST = '[Website] Delete Website Request',
  DELETE_WEBSITE_SUCCESS = '[Website] Delete Website Success',
  DELETE_WEBSITE_FAILURE = '[Website] Delete Website Failure'
}

export class GetWebsitesRequest implements Action {
  readonly type = WebsiteActionTypes.GET_WEBSITES_REQUEST;
}

export class GetWebsitesSuccess implements Action {
  readonly type = WebsiteActionTypes.GET_WEBSITES_SUCCESS;

  constructor(public payload: any) {}
}

export class GetWebsitesFailure implements Action {
  readonly type = WebsiteActionTypes.GET_WEBSITES_FAILURE;

  constructor(public payload: any) {}
}

export class CreateWebsiteRequest implements Action {
  readonly type = WebsiteActionTypes.CREATE_WEBSITE_REQUEST;

  constructor(public payload: any) {}
}

export class CreateWebsiteSuccess implements Action {
  readonly type = WebsiteActionTypes.CREATE_WEBSITE_SUCCESS;

  constructor(public payload: any) {}
}

export class CreateWebsiteFailure implements Action {
  readonly type = WebsiteActionTypes.CREATE_WEBSITE_FAILURE;

  constructor(public payload: any) {}
}

export class UpdateWebsiteRequest implements Action {
  readonly type = WebsiteActionTypes.UPDATE_WEBSITE_REQUEST;

  constructor(public payload: any) {}
}

export class UpdateWebsiteSuccess implements Action {
  readonly type = WebsiteActionTypes.UPDATE_WEBSITE_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateWebsiteFailure implements Action {
  readonly type = WebsiteActionTypes.UPDATE_WEBSITE_FAILURE;

  constructor(public payload: any) {}
}

export class DeleteWebsiteRequest implements Action {
  readonly type = WebsiteActionTypes.DELETE_WEBSITE_REQUEST;

  constructor(public payload: { websiteId: string }) {}
}

export class DeleteWebsiteSuccess implements Action {
  readonly type = WebsiteActionTypes.DELETE_WEBSITE_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteWebsiteFailure implements Action {
  readonly type = WebsiteActionTypes.DELETE_WEBSITE_FAILURE;

  constructor(public payload: any) {}
}

export type WebsiteActions =
  | GetWebsitesRequest
  | GetWebsitesSuccess
  | GetWebsitesFailure
  | CreateWebsiteRequest
  | CreateWebsiteSuccess
  | CreateWebsiteFailure
  | UpdateWebsiteRequest
  | UpdateWebsiteSuccess
  | UpdateWebsiteFailure
  | DeleteWebsiteRequest
  | DeleteWebsiteSuccess
  | DeleteWebsiteFailure;
