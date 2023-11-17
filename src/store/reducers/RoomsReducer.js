import { RoomsActionTypes } from "../actions/RoomsActions";

const initialState = {
  total: 0,
  available: 0,
  loading: false,
  checkIn: 0,
  checkOut: 0,
  unavailable: 0,
  rooms: [],
  roomCount: [],

  roomsTypes: [],
  loadingRoomsTypes: false,

  roomById: undefined,
  loadingRoomById: false,
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

    case RoomsActionTypes.GET_ROOM_BY_ID_FETCHING:
      return {
        ...state,
        loadingRoomById: true,
      };
    case RoomsActionTypes.GET_ROOM_BY_ID_FETCH:
      return {
        ...state,
        roomById: action.payload,
        loadingRoomById: false,
      };
    case RoomsActionTypes.GET_ROOM_BY_ID_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingRoomById: false,
      };

    case RoomsActionTypes.GET_ROOMSTYPES_FETCHING:
      return {
        ...state,
        loadingRoomsTypes: true,
      };
    case RoomsActionTypes.GET_ROOMSTYPES_FETCH:
      return {
        ...state,
        roomsTypes: action.payload,
        loadingRoomsTypes: false,
      };
    case RoomsActionTypes.GET_ROOMSTYPES_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingRoomsTypes: false,
      };

    case RoomsActionTypes.UPDATE_ROOMSTYPES_FETCHING:
      return {
        ...state,
        loading: true
      };
    case RoomsActionTypes.UPDATE_ROOMSTYPES_FETCH:
      return {
        ...state,
        loading: false
      };
    case RoomsActionTypes.UPDATE_ROOMSTYPES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    case RoomsActionTypes.DELETE_ROOMSTYPES_FETCHING:
      return {
        ...state,
        loading: true
      };

    case RoomsActionTypes.DELETE_ROOMSTYPES_FETCH:
      return {
        ...state,
        loading: false
      };

    case RoomsActionTypes.DELETE_ROOMSTYPES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };


    case RoomsActionTypes.GET_ROOMCOUNT_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case RoomsActionTypes.GET_ROOMCOUNT_FETCH:
      return {
        ...state,
        roomsCount: action.payload,
        loading: false,
      };
    case RoomsActionTypes.GET_ROOMCOUNT_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

      case RoomsActionTypes.CREATE_ROOM_BY_ID_FETCHING:
        return {
          ...state,
          loadingRoomById: true
        };
      case RoomsActionTypes.CREATE_ROOM_BY_ID_FETCH:
        return {
          ...state,
          loadingRoomById: false
        };
  
      case RoomsActionTypes.CREATE_ROOM_BY_ID_FETCH_ERROR:
        return {
          ...state,
          loadingRoomById: false,
          error: true
        };


    default:
      return state;
  }
}
