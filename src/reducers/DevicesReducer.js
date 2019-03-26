import * as types from "../actions/types";

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  ownedDevices: [],
  readDecices: []
};

const DevicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BEGIN_OWNED_DEVICES_FETCH:
      return { ...state };
    case types.OWNED_DEVICES_FETCH_SUCCESS:
      return {
        ...state,
        // This should always exist
        ownedDevices: action.payload.devices
      };
    default:
      return state;
  }
};

export default DevicesReducer;
