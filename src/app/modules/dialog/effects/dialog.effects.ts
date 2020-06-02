import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogActionTypes, DialogShow, DialogClose } from '../actions/dialog.actions';
import { DEFAULT_PANEL_CLASS } from '../../../core/constants/dialog.constants';

@Injectable()
export class DialogEffects {
  private dialogs: MatDialogRef<Component>[] = [];
  @Effect({ dispatch: false })
  dialogShow$: Observable<Action> = this.actions$.pipe(
    ofType<DialogShow>(DialogActionTypes.DialogShow),
    tap((action: DialogShow) => {
      const { data = {}, panelClass, disableClose = false, backdropClass } = action.payload;
      const dialog: MatDialogRef<Component> = this.dialogs.filter(
        item => item.componentInstance instanceof action.payload.component
      )[0];
      if (!dialog) {
        const activeDialog = this.dialog.open(action.payload.component, {
          disableClose,
          data,
          backdropClass,
          autoFocus: false,
          panelClass: panelClass ? [DEFAULT_PANEL_CLASS, panelClass] : DEFAULT_PANEL_CLASS
        });
        this.dialogs.push(activeDialog);
        activeDialog
          .afterClosed()
          .pipe(take(1))
          .subscribe(() => {
            const index = this.dialogs.indexOf(activeDialog);
            if (index > -1) {
              this.dialogs.splice(index, 1);
            }
          });
      }
      return EMPTY;
    })
  );
  @Effect({ dispatch: false })
  dialogClose$: Observable<Action> = this.actions$.pipe(
    ofType<DialogClose>(DialogActionTypes.DialogClose),
    tap((action: DialogClose) => {
      if (action.payload) {
        const dialog: MatDialogRef<Component> = this.dialogs.filter(
          item => item.componentInstance instanceof action.payload.component
        )[0];
        if (dialog) {
          const index = this.dialogs.indexOf(dialog);
          this.dialogs.splice(index, 1);
          dialog.close();
          return EMPTY;
        }
      }
      // close all dialogs
      while (this.dialogs.length) {
        this.dialogs.pop().close();
      }
      return EMPTY;
    })
  );
  constructor(private actions$: Actions, private dialog: MatDialog) {}
}
