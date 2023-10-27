import { TasksActionTypes } from "../actions/TasksActions";

const initialState = {
  loading: false,
  tasks: [],
  loadingTaskById: false,
  task: undefined,
  error: undefined
};

export function TasksReducer(state = initialState, action) {
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
        error: action.payload,
        loading: false,
      };

    case TasksActionTypes.UPDATE_TASK_FETCHING:
      return {
        ...state,
        loadingTaskById: true,
      };
    case TasksActionTypes.UPDATE_TASK_FETCH:
      return {
        ...state,
        loadingTaskById: false,
        tasks: action.payload,
      };
    case TasksActionTypes.UPDATE_TASK_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingTaskById: false,
      };

    case TasksActionTypes.DELETE_TASK_FETCHING:
      return {
        ...state,
        loadingTaskById: true,
      };
    case TasksActionTypes.DELETE_TASK_FETCH:
      return {
        ...state,
        loadingTaskById: false,
        tasks: action.payload,
      };
    case TasksActionTypes.DELETE_TASK_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingTaskById: false,
      };


    case TasksActionTypes.CREATE_TASK_BY_ID_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case TasksActionTypes.CREATE_TASK_BY_ID_FETCH:
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    case TasksActionTypes.CREATE_TASK_BY_ID_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}


