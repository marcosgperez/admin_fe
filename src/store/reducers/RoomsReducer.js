import { RoomsActionTypes } from "../actions/RoomsActions";

const initialState = {
  total: 0,
  available: 0,
  loading: false,
  checkIn:0,
  checkOut:0,
  unavailable: 0,
  rooms: [],
};

export function RoomsReducer(state = initialState, action) {
  switch (action.type) {
    case RoomsActionTypes.GET_ROOMS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case RoomsActionTypes.GET_ROOMS_FETCH:
      return {
        ...state,
        total: action.payload.total,
        available: action.payload.available,
        unavailable: action.payload.unavailable,
        rooms: action.payload.rooms,
        checkIn:action.payload.checkIn,
        checkOut:action.payload.checkOut,
        loading: false,
      };
    case RoomsActionTypes.GET_ROOMS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
