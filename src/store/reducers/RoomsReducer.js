import { RoomsActionTypes } from "../actions/RoomsActions";

const initialState = {
  total: 0,
  available: 0,
  loading: false,
  checkIn: 0,
  checkOut: 0,
  unavailable: 0,
  rooms: [],
  roomsTypes: [],
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
        rooms: action.payload,
        loading: false,
      };
    case RoomsActionTypes.GET_ROOMS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case RoomsActionTypes.GET_ROOMSTYPES_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case RoomsActionTypes.GET_ROOMSTYPES_FETCH:
      return {
        ...state,
        roomsTypes: action.payload,
        loading: false,
      };
    case RoomsActionTypes.GET_ROOMSTYPES_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
