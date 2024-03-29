import * as types from "../actions/types";

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  ownedDevices: [], // list of owned devices
  readDevices: [], // list of read devices
  ownedDevicePayloadCache: {}, // access like devicePayloadCache[deviceId][payloadPropertyName], contains 0-10 elements
  readDevicePayloadCache: {}
};

// TODO: check the timestamps to see if we need to update?
// TODO: Find some way to make this faster.
// Recreates the device payload cache (the last 10 entries for each payload for each device)
// This is used for graphical display.
const createDevicePayloadCache = (currentCache, devices) => {
  const newCache = { ...currentCache };
  devices.forEach(device => {
    if (!device.lastPayload) {
      return;
    }
    Object.keys(device.lastPayload).map(propertyName => {
      // Create an object for this device in the cache if one doesn't already exist
      if (!newCache[device._id]) {
        newCache[device._id] = {};
      }
      // Add the property onto this device's cache, creating the array if it doesn't exist
      newCache[device._id][propertyName] = [
        ...(newCache[device._id][propertyName] || []),
        device.lastPayload[propertyName].value
      ];
      // Now we only want to keep the last 10 entries (for graphing purposes)
      const arr = newCache[device._id][propertyName];
      if (arr.length > 10) {
        newCache[device._id][propertyName] = arr.slice(
          Math.max(arr.length - 10)
        );
      }
    });
  });
  return newCache;
};

const DevicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BEGIN_OWNED_DEVICES_FETCH:
      return { ...state };
    case types.OWNED_DEVICES_FETCH_SUCCESS:
      return {
        ...state,
        // This should always exist
        ownedDevices: action.payload.devices,
        ownedDevicePayloadCache: createDevicePayloadCache(
          state.ownedDevicePayloadCache,
          action.payload.devices
        )
      };
    case types.BEGIN_READ_DEVICES_FETCH:
      return { ...state };
    case types.READ_DEVICES_FETCH_SUCCESS:
      return {
        ...state,
        readDevices: action.payload.devices,
        readDevicePayloadCache: createDevicePayloadCache(
          state.readDevicePayloadCache,
          action.payload.devices
        )
      };
    case types.ADD_READER_SUCCESS: {
      return { ...state };
    }
    default:
      return state;
  }
};

export default DevicesReducer;
