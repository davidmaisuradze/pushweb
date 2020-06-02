import { NotificationActions, NotificationActionTypes } from '../actions/notification.actions';

export interface State {
  notifications: any[];
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  notifications: [],
  isLoading: false,
  error: null
};

export function notificationReducer(state = initialState, action: NotificationActions): State {
  switch (action.type) {
    case NotificationActionTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      };
    case NotificationActionTypes.CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case NotificationActionTypes.UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification._id === action.payload._id ? { ...action.payload } : notification
        )
      };
    case NotificationActionTypes.DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification._id !== action.payload._id
        )
      };
    default:
      return state;
  }
}
