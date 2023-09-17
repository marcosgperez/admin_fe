import React from "react";
import {
  formatError,
  login,
  runLogoutTimer,
  // saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";
import { identifyMe, identifyMeFailed } from "./UserActions";
import { authLogin } from "../../api/functions/Auth/index";
import { notifyError } from "../../hooks/toaster";
import { me } from "../../api/functions/Auth/index";
export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function signupAction(email, password, navigate) {
  return (dispatch) => {
    signUp(email, password)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        runLogoutTimer(
          dispatch,
          response.data.expiresIn * 1000
          //history,
        );
        dispatch(confirmedSignupAction(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function Logout(navigate) {
  localStorage.removeItem("userDetails");
  navigate("/login");
  //history.push('/login');
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(data, navigate) {
  return (dispatch) => {
    authLogin(data).then(async (res) => {
      const user = await me();
      if (res.ok === 1 && user.ok == 1) {
        dispatch(identifyMe(user.data));
        dispatch(loginConfirmedAction(res.data));
        navigate("/dashboard");
      } else {
        dispatch(identifyMeFailed(user.data));
        dispatch(loginFailedAction(res.data));
        notifyError(res.error);
      }
    });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
