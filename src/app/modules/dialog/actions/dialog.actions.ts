import { Action } from '@ngrx/store';

export enum DialogActionTypes {
  DialogShow = '[Dialog] Show',
  DialogClose = '[Dialog] Close'
}

export class DialogShow implements Action {
  readonly type = DialogActionTypes.DialogShow;
  constructor(
    public payload: {
      component: any;
      data?: any;
      panelClass?: any;
      disableClose?: boolean;
      backdropClass?: string;
    }
  ) {}
}

export class DialogClose implements Action {
  readonly type = DialogActionTypes.DialogClose;
  constructor(public payload?: { component: any }) {}
}

export type DialofActionsUnion = DialogShow | DialogClose;
