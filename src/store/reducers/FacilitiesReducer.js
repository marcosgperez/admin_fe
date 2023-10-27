import { FacilitiesActionTypes } from "../actions/FacilitiesActions";

const initialState = {
  loading: false,
  facilities: [],
  facilitie:undefined,
  error: undefined
};

export function FacilitiesReducer(state = initialState, action) {
  switch (action.type) {
    case FacilitiesActionTypes.GET_FACILITIES_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case FacilitiesActionTypes.GET_FACILITIES_FETCH:
      return {
        ...state,
        loading: false,
        facilities: action.payload,
      };
    case FacilitiesActionTypes.GET_FACILITIES_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case FacilitiesActionTypes.UPDATE_FACILITIES_FETCHING:
        return {
          ...state,
          loading: true,
        };
      case FacilitiesActionTypes.UPDATE_FACILITIES_FETCH:
        return {
          ...state,
          loading: false,
          facilities: action.payload,
        };
      case FacilitiesActionTypes.UPDATE_FACILITIES_FETCH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };


        case FacilitiesActionTypes.DELETE_FACILITIES_FETCHING:
          return {
            ...state,
            loading: true,
          };
        case FacilitiesActionTypes.DELETE_FACILITIES_FETCH:
          return {
            ...state,
            loading: false,
            facilities: action.payload,
          };
        case FacilitiesActionTypes.DELETE_FACILITIES_FETCH_ERROR:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };


      case FacilitiesActionTypes.GET_FACILITIES_BY_ID_FETCHING:
        return {
          ...state,
          loading: true,
        };
      case FacilitiesActionTypes.GET_FACILITIES_BY_ID_FETCH:
        return {
          ...state,
          loading: false,
          facilitie: action.payload,
        };
      case FacilitiesActionTypes.GET_FACILITIES_BY_ID_FETCH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };





        case FacilitiesActionTypes.UPDATE_FACILITIES_BY_ID_FETCHING:
          return {
            ...state,
            loading: true,
          };
        case FacilitiesActionTypes.UPDATE_FACILITIES_BY_ID_FETCH:
          return {
            ...state,
            loading: false,
            facilitie: action.payload,
          };
        case FacilitiesActionTypes.UPDATE_FACILITIES_BY_ID_FETCH_ERROR:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };

          case FacilitiesActionTypes.DELETE_FACILITIES_BY_ID_FETCHING:
            return {
              ...state,
              loading: true,
            };
          case FacilitiesActionTypes.DELETE_FACILITIES_BY_ID_FETCH:
            return {
              ...state,
              loading: false,
              facilitie: action.payload,
            };
          case FacilitiesActionTypes.DELETE_FACILITIES_BY_ID_FETCH_ERROR:
            return {
              ...state,
              error: action.payload,
              loading: false,
            };
    default:
      return state;
  }
}
