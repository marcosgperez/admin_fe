import React from "react";
import { getRooms } from "../../api/functions/Rooms"
export const GET_ROOMS = "get rooms confirmed";
export const CLEAR_ROOMS = "clear rooms failed";

export function getRoomsAction () {
  return (dispatch) => {
    getRooms().then(async (res) => {
      if (res.ok === 1) {
        dispatch(roomsActions(res.data));
      } else {
        dispatch(clearRoomsAction([]));
      }
    });
  };
}

export function roomsActions(data) {
  return {
    type: GET_ROOMS,
    payload: data.data,
  };
}

export function clearRoomsAction(data) {
  return {
    type: CLEAR_ROOMS,
    payload: data,
  };
}
