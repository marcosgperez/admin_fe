
import ApiService from "../../services/ApiService";

export const AuthActionTypes = {
  "GET_AUTH_FETCHING": "GET_AUTH_FETCHING",
  "GET_AUTH_FETCH": "GET_AUTH_FETCH",
  "GET_AUTH_FETCH_ERROR": "GET_AUTH_FETCH_ERROR",
}

export const doLogin = (email,password) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.GET_AUTH_FETCHING
  });
  ApiService.doLogin(email,password).then((res) => {
    dispatch({
      type: AuthActionTypes.GET_AUTH_FETCH,
      payload: res.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.GET_AUTH_FETCH_ERROR,
      payload: e,
    });
  })
};

// export function roomsActions(data) {
//   return {
//     type: GET_ROOMS,
//     payload: data.data,
//   };
// }

// export function clearRoomsAction(data) {
//   return {
//     type: CLEAR_ROOMS,
//     payload: data,
//   };
// }
