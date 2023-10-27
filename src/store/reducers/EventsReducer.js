import { EventsActionTypes } from "../actions/EventsActions";

const initialState = {
  loading: false,
  events: [],
  event:undefined,
  error: false
};

export function EventsReducer(state = initialState, action) {
  switch (action.type) {
    case EventsActionTypes.GET_EVENTS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case EventsActionTypes.GET_EVENTS_FETCH:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case EventsActionTypes.GET_EVENTS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case EventsActionTypes.UPDATE_EVENTS_FETCHING:
        return {
          ...state,
          loading: true,
        };
      case EventsActionTypes.UPDATE_EVENTS_FETCH:
        return {
          ...state,
          loading: false,
          events: action.payload,
        };
      case EventsActionTypes.UPDATE_EVENTS_FETCH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };


        case EventsActionTypes.DELETE_EVENTS_FETCHING:
          return {
            ...state,
            loading: true,
          };
        case EventsActionTypes.DELETE_EVENTS_FETCH:
          return {
            ...state,
            loading: false,
            events: action.payload,
          };
        case EventsActionTypes.DELETE_EVENTS_FETCH_ERROR:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };


      case EventsActionTypes.GET_EVENTS_BY_ID_FETCHING:
        return {
          ...state,
          loading: true,
        };
      case EventsActionTypes.GET_EVENTS_BY_ID_FETCH:
        return {
          ...state,
          loading: false,
          event: action.payload,
        };
      case EventsActionTypes.GET_EVENTS_BY_ID_FETCH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };





        case EventsActionTypes.UPDATE_EVENTS_BY_ID_FETCHING:
          return {
            ...state,
            loading: true,
          };
        case EventsActionTypes.UPDATE_EVENTS_BY_ID_FETCH:
          return {
            ...state,
            loading: false,
            event: action.payload,
          };
        case EventsActionTypes.UPDATE_EVENTS_BY_ID_FETCH_ERROR:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };

          case EventsActionTypes.DELETE_EVENTS_BY_ID_FETCHING:
            return {
              ...state,
              loading: true,
            };
          case EventsActionTypes.DELETE_EVENTS_BY_ID_FETCH:
            return {
              ...state,
              loading: false,
              event: action.payload,
            };
          case EventsActionTypes.DELETE_EVENTS_BY_ID_FETCH_ERROR:
            return {
              ...state,
              error: action.payload,
              loading: false,
            };
    default:
      return state;
  }
}
