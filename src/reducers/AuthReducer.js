import * as types from "../actions/types";

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  userToken: null,
  loggingIn: false,
  failedLogin: false
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BEGIN_LOGIN:
      return { ...state, loggingIn: true, failedLogin: false };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        userToken: action.payload,
        loggingIn: false,
        failedLogin: false
      };
    default:
      return state;
  }
};

export default AuthReducer;
