import ApiService from "../../services/ApiService";

export const FacilitiesActionTypes = {
  "GET_FACILITIES_FETCHING": "GET_FACILITIES_FETCHING",
  "GET_FACILITIES_FETCH": "GET_FACILITIES_FETCH",
  "GET_FACILITIES_FETCH_ERROR": "GET_FACILITIES_FETCH_ERROR",


  "GET_FACILITIE_BY_ID_FETCHING": "GET_FACILITIES_BY_ID_FETCHING",
  "GET_FACILITIE_BY_ID_FETCH": "GET_FACILITIES_BY_ID_FETCH",
  "GET_FACILITIE_BY_ID_FETCH_ERROR": "GET_FACILITIES_BY_ID_FETCH_ERROR",
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

