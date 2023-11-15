import ApiService from "../../services/ApiService";

export const RoomsActionTypes = {
  "GET_ROOMS_FETCHING": "GET_ROOMS_FETCHING",
  "GET_ROOMS_FETCH": "GET_ROOMS_FETCH",
  "GET_ROOMS_FETCH_ERROR": "GET_ROOMS_FETCH_ERROR",

  "UPDATE_ROOMS_FETCHING": "UPDATE_ROOMS_FETCHING",
  "UPDATE_ROOMS_FETCH": "UPDATE_ROOMS_FETCH",
  "UPDATE_ROOMS_FETCH_ERROR": "UPDATE_ROOMS_FETCH_ERROR",

  "DELETE_ROOMS_FETCHING": "DELETE_ROOMS_FETCHING",
  "DELETE_ROOMS_FETCH": "DELETE_ROOMS_FETCH",
  "DELETE_ROOMS_FETCH_ERROR": "DELETE_ROOMS_FETCH_ERROR",

  "GET_ROOMSTYPES_FETCHING": "GET_ROOMSTYPES_FETCHING",
  "GET_ROOMSTYPES_FETCH": "GET_ROOMSTYPES_FETCH",
  "GET_ROOMSTYPES_FETCH_ERROR": "GET_ROOMSTYPES_FETCH_ERROR",

  "UPDATE_ROOMSTYPES_FETCHING": "UPDATE_ROOMSTYPES_FETCHING",
  "UPDATE_ROOMSTYPES_FETCH": "UPDATE_ROOMSTYPES_FETCH",
  "UPDATE_ROOMSTYPES_FETCH_ERROR": "UPDATE_ROOMSTYPES_FETCH_ERROR",

  "DELETE_ROOMSTYPES_FETCHING": "DELETE_ROOMSTYPES_FETCHING",
  "DELETE_ROOMSTYPES_FETCH": "DELETE_ROOMSTYPES_FETCH",
  "DELETE_ROOMSTYPES_FETCH_ERROR": "DELETE_ROOMSTYPES_FETCH_ERROR",

  "GET_ROOMCOUNT_FETCHING": "GET_ROOMCOUNT_FETCHING",
  "GET_ROOMCOUNT_FETCH": "GET_ROOMCOUNT_FETCH",
  "GET_ROOMCOUNT_FETCH_ERROR": "GET_ROOMCOUNT_FETCH_ERROR"
}

export const getRoomsAction = () => (dispatch) => {
  dispatch({
    type: RoomsActionTypes.GET_ROOMS_FETCHING
  });
  ApiService.getRooms().then((res) => {
    dispatch({
      type: RoomsActionTypes.GET_ROOMS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: RoomsActionTypes.GET_ROOMS_FETCH_ERROR,
      payload: e,
    });
  })
};

export const updateRoomsAction = () => (dispatch) => {
  dispatch({
    type: RoomsActionTypes.UPDATE_ROOMS_FETCHING
  });
  ApiService.getRooms().then((res) => {
    dispatch({
      type: RoomsActionTypes.UPDATE_ROOMS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: RoomsActionTypes.UPDATE_ROOMS_FETCH_ERROR,
      payload: e,
    });
  })
};
export const deleteRoomsAction = () => (dispatch) => {
  dispatch({
    type: RoomsActionTypes.DELETE_ROOMS_FETCHING
  });
  ApiService.getRooms().then((res) => {
    dispatch({
      type: RoomsActionTypes.DELETE_ROOMS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: RoomsActionTypes.DELETE_ROOMS_FETCH_ERROR,
      payload: e,
    });
  })
};
export const getRoomsTypesAction = () => (dispatch) => {
  dispatch({
    type: RoomsActionTypes.GET_ROOMSTYPES_FETCHING
  });
  ApiService.getRoomsTypes().then((res) => {
    dispatch({
      type: RoomsActionTypes.GET_ROOMSTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: RoomsActionTypes.GET_ROOMSTYPES_FETCH_ERROR,
      payload: e,
    });
  })
};

export const updateRoomsTypesAction = (roomsTypes) => (dispatch) => {
  dispatch({
    type: RoomsActionTypes.UPDATE_ROOMSTYPES_FETCHING
  });
  ApiService.updateRoomsTypes(roomsTypes).then((res) => {
    dispatch({
      type: RoomsActionTypes.UPDATE_ROOMSTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: RoomsActionTypes.UPDATE_ROOMSTYPES_FETCH_ERROR,
      payload: e,
    });
  })
};

export const deleteRoomsTypesAction = (roomsTypes) => (dispatch) => {
  dispatch({
    type: RoomsActionTypes.DELETE_ROOMSTYPES_FETCHING
  });
  ApiService.deleteRoomsTypes(roomsTypes).then((res) => {
    dispatch({
      type: RoomsActionTypes.DELETE_ROOMSTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: RoomsActionTypes.DELETE_ROOMSTYPES_FETCH_ERROR,
      payload: e,
    });
  })
};

export const getRoomCountAction = () => (dispatch) => {
  dispatch({
    type: RoomsActionTypes.GET_ROOMCOUNT_FETCHING
  });
  ApiService.getRoomCount().then((res) => {
    dispatch({
      type: RoomsActionTypes.GET_ROOMCOUNT_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: RoomsActionTypes.GET_ROOMCOUNT_FETCH_ERROR,
      payload: e,
    });
  })
}