
import ApiService from "../../services/ApiService";

export const TasksActionTypes = {
  "GET_TASKS_FETCHING": "GET_TASKS_FETCHING",
  "GET_TASKS_FETCH": "GET_TASKS_FETCH",
  "GET_TASKS_FETCH_ERROR": "GET_TASKS_FETCH_ERROR",

  "GET_TASK_BY_ID_FETCHING": "GET_TASKS_BY_ID_FETCHING",
  "GET_TASK_BY_ID_FETCH": "GET_TASK_BY_ID_FETCH",
  "GET_TASK_BY_ID_FETCH_ERROR": "GET_TASK_BY_ID_FETCH_ERROR",

  "UPDATE_TASK_BY_ID_FETCHING": "UPDATE_TASKS_BY_ID_FETCHING",
  "UPDATE_TASK_BY_ID_FETCH": "UPDATE_TASK_BY_ID_FETCH",
  "UPDATE_TASK_BY_ID_FETCH_ERROR": "UPDATE_TASK_BY_ID_FETCH_ERROR",

  "DELETE_TASK_BY_ID_FETCHING": "DELETE_TASKS_BY_ID_FETCHING",
  "DELETE_TASK_BY_ID_FETCH": "DELETE_TASK_BY_ID_FETCH",
  "DELETE_TASK_BY_ID_FETCH_ERROR": "DELETE_TASK_BY_ID_FETCH_ERROR",
}

export const getTasks = () => (dispatch) => {
  dispatch({
    type: TasksActionTypes.GET_TASKS_FETCHING
  });
  ApiService.getTasks().then((res) => {
    dispatch({
      type: TasksActionTypes.GET_TASKS_FETCH,
      payload: res.data.tasks,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.GET_TASKS_FETCH_ERROR,
      payload: e,
    });
  })
};

export const getTaskByID = () => (dispatch) => {
  dispatch({
    type: TasksActionTypes.GET_TASK_BY_ID_FETCHING
  });
  ApiService.getTaskByID().then((res) => {
    dispatch({
      type: TasksActionTypes.GET_TASK_BY_ID_FETCH,
      payload: res.data.tasks,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.GET_TASK_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
};