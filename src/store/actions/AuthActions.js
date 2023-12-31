
import ApiService from "../../services/ApiService";

export const AuthActionTypes = {
  "GET_AUTH_FETCHING": "GET_AUTH_FETCHING",
  "GET_AUTH_FETCH": "GET_AUTH_FETCH",
  "GET_AUTH_FETCH_ERROR": "GET_AUTH_FETCH_ERROR",

  "GET_USERS_FETCH": "GET_USERS_FETCH",
  "GET_USERS_FETCHING": "GET_USERS_FETCHING",
  "GET_USERS_FETCH_ERROR": "GET_USER_FETCH_ERROR",

  "GET_USERTYPES_FETCH": "GET_USERTYPES_FETCH",
  "GET_USERTYPES_FETCHING": "GET_USERTYPES_FETCHING",
  "GET_USERTYPES_FETCH_ERROR": "GET_USERTYPES_FETCH_ERROR",

  "UPDATE_USERTYPES_FETCH": "UPDATE_USERTYPES_FETCH",
  "UPDATE_USERTYPES_FETCHING": "UPDATE_USERTYPES_FETCHING",
  "UPDATE_USERTYPES_FETCH_ERROR": "UPDATE_USERTYPES_FETCH_ERROR",

  "GET_USER_BY_ID_FETCH": "GET_USER_BY_ID_FETCH",
  "GET_USER_BY_ID_FETCHING": "GET_USER_BY_ID_FETCHING",
  "GET_USER_BY_ID_FETCH_ERROR": "GET_USER_BY_ID_FETCH_ERROR",

  "UPDATE_USER_BY_ID_FETCHING": "UPDATE_USER_BY_ID_FETCHING",
  "UPDATE_USER_BY_ID_FETCH": "UPDATE_USER_BY_ID_FETCH",
  "UPDATE_USER_BY_ID_FETCH_ERROR": "UPDATE_USER_BY_ID_FETCH_ERROR",

  "DELETE_USER_BY_ID_FETCHING": "DELETE_USER_BY_ID_FETCHING",
  "DELETE_USER_BY_ID_FETCH": "DELETE_USER_BY_ID_FETCH",
  "DELETE_USER_BY_ID_FETCH_ERROR": "DELETE_USER_BY_ID_FETCH_ERROR",

  "DELETE_USERTYPES_FETCH": "DELETE_USERTYPES_FETCH",
  "DELETE_USERTYPES_FETCHING": "DELETE_USERTYPES_FETCHING",
  "DELETE_USERTYPES_FETCH_ERROR": "DELETE_USERTYPES_FETCH_ERROR",

  "CREATE_USER_BY_ID_FETCHING": "CREATE_USER_BY_ID_FETCHING",
  "CREATE_USER_BY_ID_FETCH": "CREATE_USER_BY_ID_FETCH",
  "CREATE_USER_BY_ID_FETCH_ERROR": "CREATE_USER_BY_ID_FETCH_ERROR",

  "NOTIFICATIONS_FETCHING": "NOTIFICATIONS_FETCHING",
  "NOTIFICATIONS_FETCH": "NOTIFICATIONS_FETCH",
  "NOTIFICATIONS_FETCH_ERROR": "NOTIFICATIONS_FETCH_ERROR",

  "READ_NOTIFICATIONS_FETCHING": "READ_NOTIFICATIONS_FETCHING",
  "READ_NOTIFICATIONS_FETCH": "READ_NOTIFICATIONS_FETCH",
  "READ_NOTIFICATIONS_FETCH_ERROR": "READ_NOTIFICATIONS_FETCH_ERROR",
}

export const doLogin = (email, password) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.GET_AUTH_FETCHING
  });
  ApiService.doLogin(email, password).then((res) => {
    console.log(res,"res login")
    ApiService.setToken(res.data.token)
    dispatch({
      type: AuthActionTypes.GET_AUTH_FETCH,
      payload: res.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.GET_AUTH_FETCH_ERROR,
      payload: e,
    });
  })
};

export const getUsers = () => (dispatch) => {
  dispatch({
    type: AuthActionTypes.GET_USERS_FETCHING
  });
  ApiService.getUsers().then((res) => {
    dispatch({
      type: AuthActionTypes.GET_USERS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.GET_USERS_FETCH_ERROR,
      payload: e,
    });
  })
};

export const getUserTypesAction = () => (dispatch) => {
  dispatch({
    type: AuthActionTypes.GET_USERTYPES_FETCHING
  });
  ApiService.getUserTypes().then((res) => {

    dispatch({
      type: AuthActionTypes.GET_USERTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.GET_USERTYPES_FETCH_ERROR,
      payload: e,
    });
  })
};

export const updateUserTypesAction = (userTypes) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.UPDATE_USERTYPES_FETCHING
  });
  ApiService.updateUserTypes(userTypes).then((res) => {
    dispatch({
      type: AuthActionTypes.UPDATE_USERTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.UPDATE_USERTYPES_FETCH_ERROR,
      payload: e,
    });
  })
}

export const getUserByIDAction = (id) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.GET_USER_BY_ID_FETCHING
  });
  ApiService.getUserByID(id).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: AuthActionTypes.GET_USER_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.GET_USER_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const createUserAction = (user) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.CREATE_USER_BY_ID_FETCHING
  });
  ApiService.createUser(user).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: AuthActionTypes.CREATE_USER_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.CREATE_USER_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}


export const updateUserByIDAction = (user) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.UPDATE_USER_BY_ID_FETCHING
  });
  ApiService.updateUserByID(user).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: AuthActionTypes.UPDATE_USER_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.UPDATE_USER_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteUserByIDAction = (user) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.DELETE_USER_BY_ID_FETCHING
  });
  ApiService.deleteUserByID(user).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: AuthActionTypes.DELETE_USER_BY_ID_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.DELETE_USER_BY_ID_FETCH_ERROR,
      payload: e,
    });
  })
}

export const deleteUserTypesAction = (userTypes) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.DELETE_USERTYPES_FETCHING
  });
  ApiService.deleteUserTypes(userTypes).then((res) => {
    console.log(res, "RES")
    dispatch({
      type: AuthActionTypes.DELETE_USERTYPES_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.DELETE_USERTYPES_FETCH_ERROR,
      payload: e,
    });
  })
}


export const getNotificationsAction = (userId) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.NOTIFICATIONS_FETCHING
  });
  ApiService.getNotifications(userId).then((res) => {
    dispatch({
      type: AuthActionTypes.NOTIFICATIONS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.NOTIFICATIONS_FETCH_ERROR,
      payload: e,
    });
  })
}

export const readNotificationsAction = (ids) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.READ_NOTIFICATIONS_FETCHING
  });
  ApiService.readNotifications(ids).then((res) => {
    dispatch({
      type: AuthActionTypes.READ_NOTIFICATIONS_FETCH,
      payload: res.data.data,
    });
  }).catch(e => {
    dispatch({
      type: AuthActionTypes.READ_NOTIFICATIONS_FETCH_ERROR,
      payload: e,
    });
  })
}