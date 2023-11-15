import ApiService from "../../services/ApiService";

export const EventsActionTypes = {
  "GET_EVENTS_FETCHING": "GET_EVENTS_FETCHING",
  "GET_EVENTS_FETCH": "GET_EVENTS_FETCH",
  "GET_EVENTS_FETCH_ERROR": "GET_EVENTS_FETCH_ERROR",

  "DELETE_EVENT_BY_ID_FETCHING": "DELETE_EVENT_BY_ID_FETCHING",
  "DELETE_EVENT_BY_ID_FETCH": "DELETE_EVENT_BY_ID_FETCH",
  "DELETE_EVENT_BY_ID_FETCH_ERROR": "DELETE_EVENT_BY_ID_FETCH_ERROR",

  "GET_EVENT_BY_ID_FETCHING": "GET_EVENT_BY_ID_FETCHING",
  "GET_EVENT_BY_ID_FETCH": "GET_EVENT_BY_ID_FETCH",
  "GET_EVENT_BY_ID_FETCH_ERROR": "GET_EVENT_BY_ID_FETCH_ERROR",

  "UPDATE_EVENT_BY_ID_FETCHING": "UPDATE_EVENT_BY_ID_FETCHING",
  "UPDATE_EVENT_BY_ID_FETCH": "UPDATE_EVENT_BY_ID_FETCH",
  "UPDATE_EVENT_BY_ID_FETCH_ERROR": "UPDATE_EVENT_BY_ID_FETCH_ERROR",


  "CREATE_EVENT_BY_ID_FETCHING": "CREATE_EVENT_BY_ID_FETCHING",
  "CREATE_EVENT_BY_ID_FETCH": "CREATE_EVENT_BY_ID_FETCH",
  "CREATE_EVENT_BY_ID_FETCH_ERROR": "CREATE_EVENT_BY_ID_FETCH_ERROR",

}

export const getEventsAction = () => (dispatch) => {
  dispatch({
    type: EventsActionTypes.GET_EVENTS_FETCHING
  });
  ApiService.getEvents().then((res) => {
    dispatch({
      type: EventsActionTypes.GET_EVENTS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.GET_EVENTS_FETCH_ERROR,
      payload: e,
    });
  })
};

export const getEventByID = () => (dispatch) => {
  dispatch({
    type: EventsActionTypes.GET_EVENT_BY_ID_FETCHING
  });
  ApiService.getEvents().then((res) => {
    dispatch({
      type: EventsActionTypes.GET_EVENT_BY_ID_FETCH,
      payload: res.data.events,
    });
    console.log("RES",res)
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.GET_EVENT_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
};


export const deleteEventByID = (events) => (dispatch) => {
  dispatch({
    type: EventsActionTypes.DELETE_EVENT_BY_ID_FETCHING
  });
  ApiService.deleteEventByID(events).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: EventsActionTypes.DELETE_EVENT_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.DELETE_EVENT_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const updateEventByID = (event) => (dispatch) => {
  dispatch({
    type: EventsActionTypes.UPDATE_EVENT_BY_ID_FETCHING
  });
  ApiService.updateEventByID(event).then((res) => {
    dispatch({
      type: EventsActionTypes.UPDATE_EVENT_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.UPDATE_EVENT_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const createEvent = (event) => (dispatch) => {
  dispatch({
    type: EventsActionTypes.CREATE_EVENT_BY_ID_FETCHING
  });
  ApiService.createEvent(event).then((res) => {
    dispatch({
      type: EventsActionTypes.CREATE_EVENT_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: EventsActionTypes.CREATE_EVENT_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}
