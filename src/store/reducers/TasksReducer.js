import { TasksActionTypes } from "../actions/TasksActions";

const initialState = {
  loading: false,
  tasks: [],
  task:undefined,
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
      case TasksActionTypes.UPDATE_TASKS_FETCHING:
        return {
          ...state,
          loading: true,
        };
      case TasksActionTypes.UPDATE_TASKS_FETCH:
        return {
          ...state,
          loading: false,
          tasks: action.payload,
        };
      case TasksActionTypes.UPDATE_TASKS_FETCH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };


        case TasksActionTypes.DELETE_TASKS_FETCHING:
          return {
            ...state,
            loading: true,
          };
        case TasksActionTypes.DELETE_TASKS_FETCH:
          return {
            ...state,
            loading: false,
            tasks: action.payload,
          };
        case TasksActionTypes.DELETE_TASKS_FETCH_ERROR:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };


      case TasksActionTypes.GET_TASKS_BY_ID_FETCHING:
        return {
          ...state,
          loading: true,
        };
      case TasksActionTypes.GET_TASKS_BY_ID_FETCH:
        return {
          ...state,
          loading: false,
          task: action.payload,
        };
      case TasksActionTypes.GET_TASKS_BY_ID_FETCH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };





        case TasksActionTypes.UPDATE_TASKS_BY_ID_FETCHING:
          return {
            ...state,
            loading: true,
          };
        case TasksActionTypes.UPDATE_TASKS_BY_ID_FETCH:
          return {
            ...state,
            loading: false,
            task: action.payload,
          };
        case TasksActionTypes.UPDATE_TASKS_BY_ID_FETCH_ERROR:
          return {
            ...state,
            error: action.payload,
            loading: false,
          };

          case TasksActionTypes.DELETE_TASKS_BY_ID_FETCHING:
            return {
              ...state,
              loading: true,
            };
          case TasksActionTypes.DELETE_TASKS_BY_ID_FETCH:
            return {
              ...state,
              loading: false,
              task: action.payload,
            };
          case TasksActionTypes.DELETE_TASKS_BY_ID_FETCH_ERROR:
            return {
              ...state,
              error: action.payload,
              loading: false,
            };
    default:
      return state;
  }
}


