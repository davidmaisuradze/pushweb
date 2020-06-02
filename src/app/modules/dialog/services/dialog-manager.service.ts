import { Injectable, TemplateRef } from '@angular/core';
import { DEFAULT_PANEL_CLASS } from '../../../core/constants/dialog.constants';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

@Injectable()
export class DialogManagerService {
  constructor(private dialog: MatDialog) {}

  open<T>(
    component: ComponentType<T> | TemplateRef<T>,
    params: {
      disableClose?: boolean;
      data?: any;
      backdropClass?: string;
      panelClass?: string;
    }
  ): Observable<any | undefined> {
    const { disableClose, data, backdropClass, panelClass } = params;
    const dialogRef = this.dialog.open(component, {
      disableClose,
      data,
      backdropClass,
      autoFocus: false,
      panelClass: panelClass ? [DEFAULT_PANEL_CLASS, panelClass] : DEFAULT_PANEL_CLASS
    });

    return dialogRef.afterClosed();
  }
}
