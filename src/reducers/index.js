import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";

// Combine all the reducers together into one big reducer.
const rootReducer = combineReducers({
  AuthReducer
});

export default rootReducer;
