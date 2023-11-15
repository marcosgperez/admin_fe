import { TasksActionTypes } from "../actions/TasksActions";

const initialState = {
  loading: false,
  task: undefined,
  error: false,

  loadingTaskById: false,
  taskByID: undefined,

  loadingTasks: false,
  tasks: [],

  loadingTaskTypes: false,
  taskTypes: []
};

export function TasksReducer(state = initialState, action) {
  switch (action.type) {
    case TasksActionTypes.GET_TASKS_FETCHING:
      return {
        ...state,
        loadingTasks: true,
      };

    case TasksActionTypes.GET_TASKS_FETCH:
    return {
        ...state,
        tasks: action.payload,
        loadingTasks: false,
      };

    case TasksActionTypes.GET_TASKS_FETCH_ERROR:

      return {
        ...state,
        error: action.payload,
        loadingTasks: false,
      };

    case TasksActionTypes.GET_TASKTYPES_FETCH:
      return {
        ...state,
        taskTypes: action.payload,
        loadingTaskTypes: false,
      };

    case TasksActionTypes.GET_TASKTYPES_FETCHING:
      return {
        ...state,
        loadingTaskTypes: true
      };

    case TasksActionTypes.GET_TASKTYPES_FETCH_ERROR:
      return {
        ...state,
        loadingTaskTypes: false,
        error: true
      };

    case TasksActionTypes.UPDATE_TASKTYPES_FETCH:
      return {
        ...state,
        taskTypes: action.payload,
        loadingTaskTypes: false,
      };

    case TasksActionTypes.UPDATE_TASKTYPES_FETCHING:
      return {
        ...state,
        loadingTaskTypes: true
      };

    case TasksActionTypes.UPDATE_TASKTYPES_FETCH_ERROR:
      return {
        ...state,
        loadingTaskTypes: false,
        error: true
      };

    case TasksActionTypes.DELETE_TASKTYPES_FETCHING:
      return {
        ...state,
        loadingTaskTypes: true
      };

    case TasksActionTypes.DELETE_TASKTYPES_FETCH:
      return {
        ...state,
        loadingTaskTypes: false
      };

    case TasksActionTypes.DELETE_TASKTYPES_FETCH_ERROR:
      return {
        ...state,
        loadingTaskTypes: false,
        error: true
      };

    case TasksActionTypes.GET_TASK_BY_ID_FETCHING:
      return {
        ...state,
        loadingTaskById: true
      };

    case TasksActionTypes.GET_TASK_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loadingTaskById: false,
        error: false
      };

    case TasksActionTypes.GET_TASK_BY_ID_FETCH:
      return {
        ...state,
        taskByID: action.payload,
        loadingTaskById: false
      };

    case TasksActionTypes.UPDATE_TASK_BY_ID_FETCHING:
      return {
        ...state,
        loadingTaskById: true
      };
    // no deberia hacer task:action.payload?
    case TasksActionTypes.UPDATE_TASK_BY_ID_FETCH:
      return {
        ...state,
        loadingTaskById: false
      };

    case TasksActionTypes.UPDATE_TASK_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loadingTaskById: false,
        error: true
      };

    case TasksActionTypes.DELETE_TASK_BY_ID_FETCHING:
      return {
        ...state,
        loadingTaskById: true
      };
    // no deberia hacer task:action.payload?
    case TasksActionTypes.DELETE_TASK_BY_ID_FETCH:
      return {
        ...state,
        loadingTaskById: false
      };

    case TasksActionTypes.DELETE_TASK_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loadingTaskById: false,
        error: true
      };

    case TasksActionTypes.CREATE_TASK_BY_ID_FETCHING:
      return {
        ...state,
        loadingTaskById: true
      };
    case TasksActionTypes.CREATE_TASK_BY_ID_FETCH:
      return {
        ...state,
        loadingTaskById: false
      };

    case TasksActionTypes.CREATE_TASK_BY_ID_FETCH_ERROR:
      return {
        ...state,
        loadingTaskById: false,
        error: true
      };

    default:
      return state;
  }
}