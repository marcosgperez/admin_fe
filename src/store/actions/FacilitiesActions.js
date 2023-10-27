import ApiService from "../../services/ApiService";

export const FacilitiesActionTypes = {
  "GET_FACILITIES_FETCHING": "GET_FACILITIES_FETCHING",
  "GET_FACILITIES_FETCH": "GET_FACILITIES_FETCH",
  "GET_FACILITIES_FETCH_ERROR": "GET_FACILITIES_FETCH_ERROR",

  "UPDATE_FACILITIES_FETCHING": "UPDATE_FACILITIES_FETCHING",
  "UPDATE_FACILITIES_FETCH": "UPDATE_FACILITIES_FETCH",
  "UPDATE_FACILITIES_FETCH_ERROR": "UPDATE_FACILITIES_FETCH_ERROR",

  "DELETE_FACILITIES_FETCHING": "DELETE_FACILITIES_FETCHING",
  "DELETE_FACILITIES_FETCH": "DELETE_FACILITIES_FETCH",
  "DELETE_FACILITIES_FETCH_ERROR": "DELETE_FACILITIES_FETCH_ERROR",

  "GET_FACILITIES_BY_ID_FETCHING": "GET_FACILITIES_BY_ID_FETCHING",
  "GET_FACILITIES_BY_ID_FETCH": "GET_FACILITIES_BY_ID_FETCH",
  "GET_FACILITIES_BY_ID_FETCH_ERROR": "GET_FACILITIES_BY_ID_FETCH_ERROR",

  "UPDATE_FACILITIES_BY_ID_FETCHING": "UPDATE_FACILITIES_BY_ID_FETCHING",
  "UPDATE_FACILITIES_BY_ID_FETCH": "UPDATE_FACILITIES_BY_ID_FETCH",
  "UPDATE_FACILITIES_BY_ID_FETCH_ERROR": "UPDATE_FACILITIES_BY_ID_FETCH_ERROR",

  "DELETE_FACILITIES_BY_ID_FETCHING": "DELETE_FACILITIES_BY_ID_FETCHING",
  "DELETE_FACILITIES_BY_ID_FETCH": "DELETE_FACILITIES_BY_ID_FETCH",
  "DELETE_FACILITIES_BY_ID_FETCH_ERROR": "DELETE_FACILITIES_BY_ID_FETCH_ERROR",
}

export const getFacilities = () => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.GET_FACILITIES_FETCHING
  });
  ApiService.getFacilities().then((res) => {
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIES_FETCH,
      payload: res.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIES_FETCH_ERROR,
      payload: e,
    });
  })
};


export const getFacilitieByID = () => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.GET_FACILITIES_FETCHING
  });
  ApiService.getFacilitieByID().then((res) => {
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIES_FETCH,
      payload: res.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIES_FETCH_ERROR,
      payload: e,
    });
  })
};

export const updateFacilitieByIDAction = (facilities) => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.UPDATE_FACILITIES_BY_ID_FETCHING
  });
  ApiService.updateFacilitieByID(facilities).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: FacilitiesActionTypes.UPDATE_FACILITIES_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.UPDATE_FACILITIES_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteFacilitieByIDAction = (facilities) => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.DELETE_FACILITIES_BY_ID_FETCHING
  });
  ApiService.deleteFacilitieByID(facilities).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: FacilitiesActionTypes.DELETE_FACILITIES_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.DELETE_FACILITIES_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}
