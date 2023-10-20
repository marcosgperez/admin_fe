
import ApiService from "../../services/ApiService";

export const TasksActionTypes = {
  "GET_TASKS_FETCHING": "GET_TASKS_FETCHING",
  "GET_TASKS_FETCH": "GET_TASKS_FETCH",
  "GET_TASKS_FETCH_ERROR": "GET_TASKS_FETCH_ERROR",
}

export const getTasksAction = () => (dispatch) => {
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
