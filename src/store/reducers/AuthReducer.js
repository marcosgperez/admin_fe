import { AuthActionTypes } from "../actions/AuthActions";

const initialState = {
  loading: false,
  user: undefined,
  users: [],
};

export function AuthReducer(state = initialState, action) {
  console.log("AuthReducer", action)
  switch (action.type) {
    case AuthActionTypes.GET_AUTH_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.GET_AUTH_FETCH:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case AuthActionTypes.GET_AUTH_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AuthActionTypes.GET_USERS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.GET_USERS_FETCH:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case AuthActionTypes.GET_USERS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
