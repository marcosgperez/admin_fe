
import ApiService from "../../services/ApiService";

export const TasksActionTypes = {
  "GET_TASKS_FETCHING": "GET_TASKS_FETCHING",
  "GET_TASKS_FETCH": "GET_TASKS_FETCH",
  "GET_TASKS_FETCH_ERROR": "GET_TASKS_FETCH_ERROR",

  "GET_TASKTYPES_FETCH": "GET_TASKTYPES_FETCH",
  "GET_TASKTYPES_FETCHING": "GET_TASKTYPES_FETCHING",
  "GET_TASKTYPES_FETCH_ERROR": "GET_TASKTYPES_FETCH_ERROR",

  "UPDATE_TASKTYPES_FETCH": "UPDATE_TASKTYPES_FETCH",
  "UPDATE_TASKTYPES_FETCHING": "UPDATE_TASKTYPES_FETCHING",
  "UPDATE_TASKTYPES_FETCH_ERROR": "UPDATE_TASKTYPES_FETCH_ERROR",

  "GET_TASK_BY_ID_FETCH": "GET_TASK_BY_ID_FETCH",
  "GET_TASK_BY_ID_FETCHING": "GET_TASK_BY_ID_FETCHING",
  "GET_TASK_BY_ID_FETCH_ERROR": "GET_TASK_BY_ID_FETCH_ERROR",

  "UPDATE_TASK_BY_ID_FETCHING": "UPDATE_TASK_BY_ID_FETCHING",
  "UPDATE_TASK_BY_ID_FETCH": "UPDATE_TASK_BY_ID_FETCH",
  "UPDATE_TASK_BY_ID_FETCH_ERROR": "UPDATE_TASK_BY_ID_FETCH_ERROR",

  "DELETE_TASK_BY_ID_FETCHING": "DELETE_TASK_BY_ID_FETCHING",
  "DELETE_TASK_BY_ID_FETCH": "DELETE_TASK_BY_ID_FETCH",
  "DELETE_TASK_BY_ID_FETCH_ERROR": "DELETE_TASK_BY_ID_FETCH_ERROR",

  "DELETE_TASKTYPES_FETCH": "DELETE_TASKTYPES_FETCH",
  "DELETE_TASKTYPES_FETCHING": "DELETE_TASKTYPES_FETCHING",
  "DELETE_TASKTYPES_FETCH_ERROR": "DELETE_TASKTYPES_FETCH_ERROR",

  "CREATE_TASK_BY_ID_FETCHING": "CREATE_TASK_BY_ID_FETCHING",
  "CREATE_TASK_BY_ID_FETCH": "CREATE_TASK_BY_ID_FETCH",
  "CREATE_TASK_BY_ID_FETCH_ERROR": "CREATE_TASK_BY_ID_FETCH_ERROR",
}

export const getTasks = () => (dispatch) => {
  dispatch({
    type: TasksActionTypes.GET_TASKS_FETCHING
  });
  ApiService.getTasks().then((res) => {
    console.log(res,"tasksAction")
    dispatch({
      type: TasksActionTypes.GET_TASKS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.GET_TASKS_FETCH_ERROR,
      payload: e,
    });
  })
};

export const getTaskTypes = () => (dispatch) => {
  dispatch({
    type: TasksActionTypes.GET_TASKTYPES_FETCHING
  });
  ApiService.getTaskTypes().then((res) => {

    dispatch({
      type: TasksActionTypes.GET_TASKTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.GET_TASKTYPES_FETCH_ERROR,
      payload: e,
    });
  })
};

export const updateTaskTypes = (taskTypes) => (dispatch) => {
  dispatch({
    type: TasksActionTypes.UPDATE_TASKTYPES_FETCHING
  });
  ApiService.updateTaskTypes(taskTypes).then((res) => {
    dispatch({
      type: TasksActionTypes.UPDATE_TASKTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.UPDATE_TASKTYPES_FETCH_ERROR,
      payload: e,
    });
  })
}

export const getTaskByID = (id) => (dispatch) => {
  dispatch({
    type: TasksActionTypes.GET_TASK_BY_ID_FETCHING
  });
  ApiService.getTaskByID(id).then((res) => {
    dispatch({
      type: TasksActionTypes.GET_TASK_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.GET_TASK_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const createTask = (task) => (dispatch) => {
  dispatch({
    type: TasksActionTypes.CREATE_TASK_BY_ID_FETCHING
  });
  ApiService.createTask(task).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: TasksActionTypes.CREATE_TASK_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.CREATE_TASK_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}


export const updateTaskByID = (task) => (dispatch) => {
  dispatch({
    type: TasksActionTypes.UPDATE_TASK_BY_ID_FETCHING
  });
  ApiService.updateTaskByID(task).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: TasksActionTypes.UPDATE_TASK_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.UPDATE_TASK_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteTaskByID = (task) => (dispatch) => {
  dispatch({
    type: TasksActionTypes.DELETE_TASK_BY_ID_FETCHING
  });
  ApiService.deleteTaskByID(task).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: TasksActionTypes.DELETE_TASK_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.DELETE_TASK_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteTaskTypes = (taskTypes) => (dispatch) => {
  dispatch({
    type: TasksActionTypes.DELETE_TASKTYPES_FETCHING
  });
  ApiService.deleteTaskTypes(taskTypes).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: TasksActionTypes.DELETE_TASKTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: TasksActionTypes.DELETE_TASKTYPES_FETCH_ERROR,
      payload: e,
    });
  })
}