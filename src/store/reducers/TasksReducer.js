import { TasksActionTypes } from "../actions/TasksActions";

const initialState = {
  loading: false,
  tasks: [],
  error: undefined
};

export function TasksReducer(state = initialState, action) {
  console.log("TasksReducer", action)
  switch (action.type) {
    case TasksActionTypes.GET_TASKS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case TasksActionTypes.GET_TASKS_FETCH:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case TasksActionTypes.GET_TASKS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    default:
      return state;
  }
}
