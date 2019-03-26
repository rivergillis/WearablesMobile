import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DevicesReducer from "./DevicesReducer";

// Combine all the reducers together into one big reducer.
const rootReducer = combineReducers({
  AuthReducer,
  DevicesReducer
});

export default rootReducer;
