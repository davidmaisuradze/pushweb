import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../../../root-store';
import * as NotificationSelectors from '../../selectors/notification.selectors';
import { faEdit, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DialogShow } from '../../../dialog/actions/dialog.actions';
import { AddOrUpdateNotificationComponent } from '../../components/add-or-update-notification/add-or-update-notification.component';
import { ConfirmModalService } from '../../../../core/services/confirm-modal.service';
import { take } from 'rxjs/operators';
import {
  DeleteNotificationRequest,
  GetNotificationsRequest
} from '../../actions/notification.actions';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  private _destruct = new Subject();
  public icons = {
    send: faPaperPlane,
    edit: faEdit,
    times: faTimes
  };
  public notifications$: Observable<any>;

  constructor(
    private store: Store<RootStoreState.RootState>,
    private confirmModalService: ConfirmModalService,
    private notificationService: NotificationService
  ) {
    this.notifications$ = this.store.select(NotificationSelectors.selectNotifications);
  }

  ngOnInit() {
    this.store.dispatch(new GetNotificationsRequest());
  }

  addNotification() {
    this.store.dispatch(
      new DialogShow({
        component: AddOrUpdateNotificationComponent
      })
    );
  }

  updateNotification(notification) {
    this.store.dispatch(
      new DialogShow({
        component: AddOrUpdateNotificationComponent,
        data: notification
      })
    );
  }

  sendNotification(notificationId, notificationTitle) {
    this.confirmModalService
      .showConfirm({
        text: `Are you sure you want to send this notification: ${notificationTitle}`,
        title: 'Send Notification'
      })
      .pipe(take(1))
      .subscribe(
        result => result && this.notificationService.sendNotifications(notificationId).subscribe()
      );
  }

  removeNotification(notificationId, notificationTitle) {
    this.confirmModalService
      .showConfirm({
        text: `Are you sure you want to remove the notification: ${notificationTitle}`,
        title: 'Delete Notification'
      })
      .pipe(take(1))
      .subscribe(
        result =>
          result &&
          this.store.dispatch(new DeleteNotificationRequest({ notificationId: notificationId }))
      );
  }
}
