import { EventsActionTypes } from "../actions/EventsActions";

const initialState = {
  loading: false,
  events: [],
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
    default:
      return state;
  }
}
