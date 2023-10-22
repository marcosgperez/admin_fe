import ApiService from "../../services/ApiService";

export const UserActionTypes = {
  "GET_USER_FETCHING": "GET_USER_FETCHING",
  "GET_USER_FETCH": "GET_USER_FETCH",
  "GET_USER_FETCH_ERROR": "GET_USER_FETCH_ERROR",
}

export const getUserAction = () => (dispatch) => {
  dispatch({
    type: UserActionTypes.GET_USER_FETCHING
  });
  ApiService.getUser().then((res) => {
    dispatch({
      type: UserActionTypes.GET_USER_FETCH,
      payload: res.data,
    });
  }).catch(e => {
    dispatch({
      type: UserActionTypes.GET_USER_FETCH_ERROR,
      payload: e,
    });
  })
};


