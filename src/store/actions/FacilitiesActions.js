import ApiService from "../../services/ApiService";

export const FacilitiesActionTypes = {


  "GET_FACILITIES_FETCH": "GET_FACILITIES_FETCH",
  "GET_FACILITIES_FETCHING": "GET_FACILITIES_FETCHING",
  "GET_FACILITIES_FETCH_ERROR": "GET_FACILITIE_FETCH_ERROR",

  "GET_FACILITIETYPES_FETCH": "GET_FACILITIETYPES_FETCH",
  "GET_FACILITIETYPES_FETCHING": "GET_FACILITIETYPES_FETCHING",
  "GET_FACILITIETYPES_FETCH_ERROR": "GET_FACILITIETYPES_FETCH_ERROR",

  "UPDATE_FACILITIETYPES_FETCH": "UPDATE_FACILITIETYPES_FETCH",
  "UPDATE_FACILITIETYPES_FETCHING": "UPDATE_FACILITIETYPES_FETCHING",
  "UPDATE_FACILITIETYPES_FETCH_ERROR": "UPDATE_FACILITIETYPES_FETCH_ERROR",

  "GET_FACILITIE_BY_ID_FETCH": "GET_FACILITIE_BY_ID_FETCH",
  "GET_FACILITIE_BY_ID_FETCHING": "GET_FACILITIE_BY_ID_FETCHING",
  "GET_FACILITIE_BY_ID_FETCH_ERROR": "GET_FACILITIE_BY_ID_FETCH_ERROR",

  "UPDATE_FACILITIE_BY_ID_FETCHING": "UPDATE_FACILITIE_BY_ID_FETCHING",
  "UPDATE_FACILITIE_BY_ID_FETCH": "UPDATE_FACILITIE_BY_ID_FETCH",
  "UPDATE_FACILITIE_BY_ID_FETCH_ERROR": "UPDATE_FACILITIE_BY_ID_FETCH_ERROR",

  "DELETE_FACILITIE_BY_ID_FETCHING": "DELETE_FACILITIE_BY_ID_FETCHING",
  "DELETE_FACILITIE_BY_ID_FETCH": "DELETE_FACILITIE_BY_ID_FETCH",
  "DELETE_FACILITIE_BY_ID_FETCH_ERROR": "DELETE_FACILITIE_BY_ID_FETCH_ERROR",

  "DELETE_FACILITIETYPES_FETCH": "DELETE_FACILITIETYPES_FETCH",
  "DELETE_FACILITIETYPES_FETCHING": "DELETE_FACILITIETYPES_FETCHING",
  "DELETE_FACILITIETYPES_FETCH_ERROR": "DELETE_FACILITIETYPES_FETCH_ERROR",

  "CREATE_FACILITIE_BY_ID_FETCHING": "CREATE_FACILITIE_BY_ID_FETCHING",
  "CREATE_FACILITIE_BY_ID_FETCH": "CREATE_FACILITIE_BY_ID_FETCH",
  "CREATE_FACILITIE_BY_ID_FETCH_ERROR": "CREATE_FACILITIE_BY_ID_FETCH_ERROR",
}


export const getFacilities = () => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.GET_FACILITIES_FETCHING
  });
  ApiService.getFacilities().then((res) => {
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIES_FETCH_ERROR,
      payload: e,
    });
  })
};

export const getFacilitieTypes = () => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.GET_FACILITIETYPES_FETCHING
  });
  ApiService.getFacilitieTypes().then((res) => {

    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIETYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIETYPES_FETCH_ERROR,
      payload: e,
    });
  })
};

export const updateFacilitieTypes= (facilitieTypes) => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.UPDATE_FACILITIETYPES_FETCHING
  });
  ApiService.updateFacilitieTypes(facilitieTypes).then((res) => {
    dispatch({
      type: FacilitiesActionTypes.UPDATE_FACILITIETYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.UPDATE_FACILITIETYPES_FETCH_ERROR,
      payload: e,
    });
  })
}

export const getFacilitieByID = (id) => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.GET_FACILITIE_BY_ID_FETCHING
  });
  ApiService.getFacilitieByID(id).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIE_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.GET_FACILITIE_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const createFacilitie = (facilitie) => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.CREATE_FACILITIE_BY_ID_FETCHING
  });
  ApiService.createFacilitie(facilitie).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: FacilitiesActionTypes.CREATE_FACILITIE_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.CREATE_FACILITIE_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}


export const updateFacilitieByID = (facilitie) => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.UPDATE_FACILITIE_BY_ID_FETCHING
  });
  ApiService.updateFacilitieByID(facilitie).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: FacilitiesActionTypes.UPDATE_FACILITIE_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.UPDATE_FACILITIE_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteFacilitieByID = (facilitie) => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.DELETE_FACILITIE_BY_ID_FETCHING
  });
  ApiService.deleteFacilitieByID(facilitie).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: FacilitiesActionTypes.DELETE_FACILITIE_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.DELETE_FACILITIE_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteFacilitieTypes = (facilitieTypes) => (dispatch) => {
  dispatch({
    type: FacilitiesActionTypes.DELETE_FACILITIETYPES_FETCHING
  });
  ApiService.deleteFacilitieTypes(facilitieTypes).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: FacilitiesActionTypes.DELETE_FACILITIETYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: FacilitiesActionTypes.DELETE_FACILITIETYPES_FETCH_ERROR,
      payload: e,
    });
  })
}
