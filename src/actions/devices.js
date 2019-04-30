import axios from "axios";
import * as types from "./types";
import { BASE_URL } from "../env";

// Fetches all devices that the user owns
const fetchOwnedDevices = async (dispatch, userToken) => {
  dispatch({ type: types.BEGIN_OWNED_DEVICES_FETCH });
  try {
    const res = await axios.get(`${BASE_URL}/devices/`, {
      params: { type: "owner" },
      headers: { Authorization: `Bearer ${userToken}` }
    });
    dispatch({ type: types.OWNED_DEVICES_FETCH_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// Fetches all devices that the user can read
const fetchReadDevices = async (dispatch, userToken) => {
  dispatch({ type: types.BEGIN_READ_DEVICES_FETCH });
  try {
    const res = await axios.get(`${BASE_URL}/devices/`, {
      params: { type: "read" },
      headers: { Authorization: `Bearer ${userToken}` }
    });
    dispatch({ type: types.READ_DEVICES_FETCH_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// Fetches a list of all owned and readable devices.
export const fetchDevices = userToken => dispatch => {
  // console.log("fetching devices");
  fetchOwnedDevices(dispatch, userToken);
  fetchReadDevices(dispatch, userToken);
};

// Adds a reader to a device
export const addReader = (deviceId, readerEmail, userToken) => dispatch => {
  axios
    .post(
      `${BASE_URL}/devices/${deviceId}/readers/`,
      { readerEmail },
      { headers: { Authorization: `Bearer ${userToken}` } }
    )
    .then(res => {
      dispatch({
        type: types.ADD_READER_SUCCESS,
        payload: { deviceId, readerEmail }
      });
      console.log(res);
    })
    .catch(err => console.log(err));
};
