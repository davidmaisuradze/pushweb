import { WebsiteActions, WebsiteActionTypes } from '../actions/website.actions';

export interface State {
  websites: any[];
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  websites: [],
  isLoading: false,
  error: null
};

export function websiteReducer(state = initialState, action: WebsiteActions): State {
  switch (action.type) {
    case WebsiteActionTypes.GET_WEBSITES_SUCCESS:
      return {
        ...state,
        websites: action.payload
      };
    case WebsiteActionTypes.CREATE_WEBSITE_SUCCESS:
      return {
        ...state,
        websites: [...state.websites, action.payload]
      };
    case WebsiteActionTypes.UPDATE_WEBSITE_SUCCESS:
      console.log(action.payload, 'as');
      return {
        ...state,
        websites: state.websites.map(website =>
          website._id === action.payload._id ? { ...action.payload } : website
        )
      };
    case WebsiteActionTypes.DELETE_WEBSITE_SUCCESS:
      return {
        ...state,
        websites: state.websites.filter(website => website._id !== action.payload._id)
      };
    default:
      return state;
  }
}
