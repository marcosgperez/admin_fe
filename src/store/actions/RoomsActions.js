
import ApiService from "../../services/ApiService";

export const RoomsActionTypes = {
  "GET_ROOMS_FETCHING": "GET_ROOMS_FETCHING",
  "GET_ROOMS_FETCH": "GET_ROOMS_FETCH",
  "GET_ROOMS_FETCH_ERROR": "GET_ROOMS_FETCH_ERROR",
}

export const getRoomsAction = () => (dispatch) => {
  dispatch({
    type: RoomsActionTypes.GET_ROOMS_FETCHING
  });
  ApiService.getRooms().then((res) => {
    dispatch({
      type: RoomsActionTypes.GET_ROOMS_FETCH,
      payload: res.data,
    });
  }).catch(e => {
    dispatch({
      type: RoomsActionTypes.GET_ROOMS_FETCH_ERROR,
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
