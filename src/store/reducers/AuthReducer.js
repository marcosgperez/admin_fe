import { AuthActionTypes } from "../actions/AuthActions";

const initialState = {
  loading: false,
  user: undefined,
  error: false,
  userByID: undefined,
  users: [],
  userTypes: []
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

    case AuthActionTypes.GET_USERTYPES_FETCH:
      return {
        ...state,
        userTypes: action.payload,
        loading: false,
      };

    case AuthActionTypes.GET_USERTYPES_FETCHING:
      return {
        ...state,
        loading: true
      };

    case AuthActionTypes.GET_USERTYPES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case AuthActionTypes.UPDATE_USERTYPES_FETCH:
      return {
        ...state,
        userTypes: action.payload,
        loading: false,
      };
    case AuthActionTypes.UPDATE_USERTYPES_FETCHING:
      return {
        ...state,
        loading: true
      };
    case AuthActionTypes.UPDATE_USERTYPES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

      case AuthActionTypes.DELETE_USERTYPES_FETCHING:
        return {
          ...state,
          loading: true
        };

      case AuthActionTypes.DELETE_USERTYPES_FETCH:
        return {
          ...state,
          loading: false
        };
  
      case AuthActionTypes.DELETE_USERTYPES_FETCH_ERROR:
        return {
          ...state,
          loading: false,
          error: true
        };

    case AuthActionTypes.GET_USER_BY_ID_FETCHING:
      return {
        ...state,
        loading: true
      };

    case AuthActionTypes.GET_USER_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: false
      };

    case AuthActionTypes.GET_USER_BY_ID_FETCH:
      return {
        ...state,
        userByID: action.payload,
        loading: false
      }

    case AuthActionTypes.UPDATE_USER_BY_ID_FETCHING:
      return {
        ...state,
        loading: true
      };
    // no deberia hacer user:action.payload?
    case AuthActionTypes.UPDATE_USER_BY_ID_FETCH:
      return {
        ...state,
        loading: false
      };

    case AuthActionTypes.UPDATE_USER_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

      case AuthActionTypes.DELETE_USER_BY_ID_FETCHING:
        return {
          ...state,
          loading: true
        };
      // no deberia hacer user:action.payload?
      case AuthActionTypes.DELETE_USER_BY_ID_FETCH:
        return {
          ...state,
          loading: false
        };
  
      case AuthActionTypes.DELETE_USER_BY_ID_FETCH_ERROR:
        return {
          ...state,
          loading: false,
          error: true
        };
  
     
   

    default:
      return state;
  }
}
