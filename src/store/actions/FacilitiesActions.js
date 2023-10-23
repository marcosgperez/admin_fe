import ApiService from "../../services/ApiService";

export const FacilitiesActionTypes = {
  "GET_FACILITIES_FETCHING": "GET_FACILITIES_FETCHING",
  "GET_FACILITIES_FETCH": "GET_FACILITIES_FETCH",
  "GET_FACILITIES_FETCH_ERROR": "GET_FACILITIES_FETCH_ERROR",
}

export const getFacilitiesAction = () => (dispatch) => {
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


