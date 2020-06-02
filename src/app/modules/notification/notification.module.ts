import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { notificationReducer } from './reducers/notification.reducers';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './effects/notification.effects';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../dialog';
import { AuthGuard } from '../../core/guards/auth.guard';

// ===== COMPONENTS =====
import { NotificationsComponent } from './containers/notifications/notifications.component';
import { AddOrUpdateNotificationComponent } from './components/add-or-update-notification/add-or-update-notification.component';

// ===== ROUTES =====
const ROUTES = [
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('notifications', notificationReducer),
    EffectsModule.forFeature([NotificationEffects]),
    RouterModule.forChild(ROUTES),
    DialogModule
  ],
  declarations: [NotificationsComponent, AddOrUpdateNotificationComponent],
  entryComponents: [AddOrUpdateNotificationComponent],
  providers: []
})
export class NotificationModule {}
