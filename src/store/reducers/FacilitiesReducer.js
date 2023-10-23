import { FacilitiesActionTypes } from "../actions/FacilitiesActions";

const initialState = {
  loading: false,
  facilities: [],
  error: undefined
};

export function FacilitiesReducer(state = initialState, action) {
  // console.log("TasksReducer", action)
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
        facilities: action.payload.facilities,
      };
    case FacilitiesActionTypes.GET_FACILITIES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    default:
      return state;
  }
}
