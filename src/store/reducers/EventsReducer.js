import { EventsActionTypes } from "../actions/EventsActions";

const initialState = {
  loading: false,
  events: [],
  error: false,
};

export function EventsReducer(state = initialState, action) {
  console.log("EventsReducer", action)
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
        tasks: action.payload,
      };
    case EventsActionTypes.GET_EVENTS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    default:
      return state;
  }
}
