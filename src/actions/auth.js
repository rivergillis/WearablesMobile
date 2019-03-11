import axios from "axios";
import * as types from "./types";
import { BASE_URL } from "../env";

export const ackLoginFail = () => dispatch => {
  console.log("ackfail");
};

export const loginUserSuccess = async (dispatch, data) => {
  console.log("Logged in");
  dispatch({ type: types.LOGIN_SUCCESS, payload: data.token });
};

export const loginUser = (email, password) => dispatch => {
  dispatch({ type: types.BEGIN_LOGIN });
  axios
    .post(`${BASE_URL}/users/login/`, { email, password })
    .then(res => loginUserSuccess(dispatch, res.data))
    .catch(err => console.log(err));
};
