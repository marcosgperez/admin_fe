import { GET_ROOMS, CLEAR_ROOMS } from "../actions/RoomsActions";

const initialState = {
  total: 0,
  available: 0,
  unavailable: 0,
  rooms: [],
};

export function RoomsReducer(state = initialState, action) {
  if (action.type === GET_ROOMS) {
    return {
      ...state,
      total: action.payload.total,
      available: action.payload.available,
      unavailable: action.payload.unavailable,
      rooms: action.payload.rooms,
    };
  }
  if (action.type === CLEAR_ROOMS) {
    return {
      ...state,
      total: 0,
      available: 0,
      unavailable: 0,
      rooms: [],
    };
  }
  return state;
}
