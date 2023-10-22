import { UserActionTypes } from "../actions/UserActions";

const initialState = {
  loading: false,
  user: [],
  error: false
};

export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.GET_USER_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.GET_USER_FETCH:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UserActionTypes.GET_USER_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
