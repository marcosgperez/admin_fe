import { EventsActionTypes } from "../actions/EventsActions";

const initialState = {
  loading: false,
  events: [],
  loadingById: false,
  event: undefined,
  error: false
};

export function EventsReducer(state = initialState, action) {
  // console.log("EventsReducer", action)
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
    case EventsActionTypes.UPDATE_EVENT_BY_ID_FETCHING:
      return {
        ...state,
        loadingById: true,
      };
    case EventsActionTypes.UPDATE_EVENT_BY_ID_FETCH:
      return {
        ...state,
        loadingById: false,
        event: action.payload,
      };
    case EventsActionTypes.UPDATE_EVENT_BY_ID_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingById: false,
      };
    case EventsActionTypes.DELETE_EVENT_BY_ID_FETCHING:
      return {
        ...state,
        loadingById: true,
      };
    case EventsActionTypes.DELETE_EVENT_BY_ID_FETCH:
      return {
        ...state,
        loadingById: false,
        event: action.payload,
      };
    case EventsActionTypes.DELETE_EVENT_BY_ID_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingById: false,
      };

    case EventsActionTypes.GET_EVENT_BY_ID_FETCHING:
      return {
        ...state,
        loadingById: true,
      };
    case EventsActionTypes.GET_EVENT_BY_ID_FETCH:
      return {
        ...state,
        loadingById: false,
        event: action.payload,
      };
    case EventsActionTypes.GET_EVENT_BY_ID_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingById: false,
      };

    case EventsActionTypes.CREATE_EVENT_BY_ID_FETCHING:
      return {
        ...state,
        loadingById: true,
      };
    case EventsActionTypes.CREATE_EVENT_BY_ID_FETCH:
      return {
        ...state,
        loadingById: false,
        event: action.payload,
      };
    case EventsActionTypes.CREATE_EVENT_BY_ID_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingById: false,
      };

    default:
      return state;
  }
}
