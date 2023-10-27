import ApiService from "../../services/ApiService";

export const EventsActionTypes = {
  "GET_EVENTS_FETCHING": "GET_EVENTS_FETCHING",
  "GET_EVENTS_FETCH": "GET_EVENTS_FETCH",
  "GET_EVENTS_FETCH_ERROR": "GET_EVENTS_FETCH_ERROR",

  "UPDATE_EVENTS_FETCHING": "UPDATE_EVENTS_FETCHING",
  "UPDATE_EVENTS_FETCH": "UPDATE_EVENTS_FETCH",
  "UPDATE_EVENTS_FETCH_ERROR": "UPDATE_EVENTS_FETCH_ERROR",

  "DELETE_EVENTS_FETCHING": "DELETE_EVENTS_FETCHING",
  "DELETE_EVENTS_FETCH": "DELETE_EVENTS_FETCH",
  "DELETE_EVENTS_FETCH_ERROR": "DELETE_EVENTS_FETCH_ERROR",

  "GET_EVENTS_BY_ID_FETCHING": "GET_EVENTS_BY_ID_FETCHING",
  "GET_EVENTS_BY_ID_FETCH": "GET_EVENTS_BY_ID_FETCH",
  "GET_EVENTS_BY_ID_FETCH_ERROR": "GET_EVENTS_BY_ID_FETCH_ERROR",

  "UPDATE_EVENTS_BY_ID_FETCHING": "UPDATE_EVENTS_BY_ID_FETCHING",
  "UPDATE_EVENTS_BY_ID_FETCH": "UPDATE_EVENTS_BY_ID_FETCH",
  "UPDATE_EVENTS_BY_ID_FETCH_ERROR": "UPDATE_EVENTS_BY_ID_FETCH_ERROR",

  "DELETE_EVENTS_BY_ID_FETCHING": "DELETE_EVENTS_BY_ID_FETCHING",
  "DELETE_EVENTS_BY_ID_FETCH": "DELETE_EVENTS_BY_ID_FETCH",
  "DELETE_EVENTS_BY_ID_FETCH_ERROR": "DELETE_EVENTS_BY_ID_FETCH_ERROR",
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

export const getEventByIDAction = () => (dispatch) => {
  dispatch({
    type: EventsActionTypes.GET_EVENTS_BY_ID_FETCHING
  });
  ApiService.getEvents().then((res) => {
    dispatch({
      type: EventsActionTypes.GET_EVENTS_BY_ID_FETCH,
      payload: res.data.events,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.GET_EVENTS_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
};


export const updateEventByIDAction = (events) => (dispatch) => {
  dispatch({
    type: EventsActionTypes.UPDATE_EVENTS_BY_ID_FETCHING
  });
  ApiService.updateEventByID(events).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: EventsActionTypes.UPDATE_EVENTS_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.UPDATE_EVENTS_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteEventByIDAction = (events) => (dispatch) => {
  dispatch({
    type: EventsActionTypes.DELETE_EVENTS_BY_ID_FETCHING
  });
  ApiService.deleteEventByID(events).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: EventsActionTypes.DELETE_EVENTS_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.DELETE_EVENTS_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const updateEvents = (events) => (dispatch) => {
  dispatch({
    type: EventsActionTypes.UPDATE_EVENTS_FETCHING
  });
  ApiService.updateEvents(events).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: EventsActionTypes.UPDATE_EVENTS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.UPDATE_EVENTS_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteEvents = (events) => (dispatch) => {
  dispatch({
    type: EventsActionTypes.DELETE_EVENTS_FETCHING
  });
  ApiService.deleteEvents(events).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: EventsActionTypes.DELETE_EVENTS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.DELETE_EVENTS_FETCH_ERROR,
      payload: e,
    });
  })
}
