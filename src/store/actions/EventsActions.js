import ApiService from "../../services/ApiService";

export const EventsActionTypes = {
  "GET_EVENTS_FETCHING": "GET_EVENTS_FETCHING",
  "GET_EVENTS_FETCH": "GET_EVENTS_FETCH",
  "GET_EVENTS_FETCH_ERROR": "GET_EVENTS_FETCH_ERROR",
}

export const getEventsAction = () => (dispatch) => {
  dispatch({
    type: EventsActionTypes.GET_EVENTS_FETCHING
  });
  ApiService.getEvents().then((res) => {
    dispatch({
      type: EventsActionTypes.GET_EVENTS_FETCH,
      payload: res.data.events,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.GET_EVENTS_FETCH_ERROR,
      payload: e,
    });
  })
};


