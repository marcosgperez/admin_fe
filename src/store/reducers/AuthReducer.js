import { AuthActionTypes } from "../actions/AuthActions";

const initialState = {
  loading: false,
  user: undefined,
  token: undefined,
  error: false,

  loadingUserById: false,
  userByID: undefined,

  loadingUsers: false,
  users: [],

  loadingUserTypes: false,
  userTypes: []
};

export function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActionTypes.GET_AUTH_FETCHING:
      return {
        ...state,
        loading: true,
      };

    case AuthActionTypes.GET_AUTH_FETCH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
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
        loadingUsers: true,
      };

    case AuthActionTypes.GET_USERS_FETCH:
      return {
        ...state,
        users: action.payload,
        loadingUsers: false,
      };

    case AuthActionTypes.GET_USERS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingUsers: false,
      };

    case AuthActionTypes.GET_USERTYPES_FETCH:
      return {
        ...state,
        userTypes: action.payload,
        loadingUserTypes: false,
      };

    case AuthActionTypes.GET_USERTYPES_FETCHING:
      return {
        ...state,
        loadingUserTypes: true
      };

    case AuthActionTypes.GET_USERTYPES_FETCH_ERROR:
      return {
        ...state,
        loadingUserTypes: false,
        error: true
      };

    case AuthActionTypes.UPDATE_USERTYPES_FETCH:
      return {
        ...state,
        userTypes: action.payload,
        loadingUserTypes: false,
      };

    case AuthActionTypes.UPDATE_USERTYPES_FETCHING:
      return {
        ...state,
        loadingUserTypes: true
      };

    case AuthActionTypes.UPDATE_USERTYPES_FETCH_ERROR:
      return {
        ...state,
        loadingUserTypes: false,
        error: true
      };

    case AuthActionTypes.DELETE_USERTYPES_FETCHING:
      return {
        ...state,
        loadingUserTypes: true
      };

    case AuthActionTypes.DELETE_USERTYPES_FETCH:
      return {
        ...state,
        loadingUserTypes: false
      };

    case AuthActionTypes.DELETE_USERTYPES_FETCH_ERROR:
      return {
        ...state,
        loadingUserTypes: false,
        error: true
      };

    case AuthActionTypes.GET_USER_BY_ID_FETCHING:
      return {
        ...state,
        loadingUserById: true
      };

    case AuthActionTypes.GET_USER_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loadingUserById: false,
        error: false
      };

    case AuthActionTypes.GET_USER_BY_ID_FETCH:
      return {
        ...state,
        userByID: action.payload,
        loadingUserById: false
      };

    case AuthActionTypes.UPDATE_USER_BY_ID_FETCHING:
      return {
        ...state,
        loadingUserById: true
      };
    // no deberia hacer user:action.payload?
    case AuthActionTypes.UPDATE_USER_BY_ID_FETCH:
      return {
        ...state,
        loadingUserById: false
      };

    case AuthActionTypes.UPDATE_USER_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loadingUserById: false,
        error: true
      };

    case AuthActionTypes.DELETE_USER_BY_ID_FETCHING:
      return {
        ...state,
        loadingUserById: true
      };
    // no deberia hacer user:action.payload?
    case AuthActionTypes.DELETE_USER_BY_ID_FETCH:
      return {
        ...state,
        loadingUserById: false
      };

    case AuthActionTypes.DELETE_USER_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loadingUserById: false,
        error: true
      };

    case AuthActionTypes.CREATE_USER_BY_ID_FETCHING:
      return {
        ...state,
        loadingUserById: true
      };
    case AuthActionTypes.CREATE_USER_BY_ID_FETCH:
      return {
        ...state,
        loadingUserById: false
      };

    case AuthActionTypes.CREATE_USER_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loadingUserById: false,
        error: true
      };

    default:
      return state;
  }
}
