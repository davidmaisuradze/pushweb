import * as AuthState from '../auth/reducers/auth.reducer';
import * as WebsitesState from '../website/reducers/website.reducers';
import * as NotificationState from '../notification/reducers/notification.reducers';

export interface RootState {
  auth: AuthState.State;
  website: WebsitesState.State;
  notification: NotificationState.State;
}
