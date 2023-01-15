import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UPDATE_USER,
  FETCH_USER,
} from "./userType";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const fetchUserById = (user) => {
  return {
    type: FETCH_USER,
    payload: user,
  };
};

const userUpdateById = (user, id) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};
const URI = "https://touchinspiration-0ada.restdb.io/rest/sample";
const CONFIG = {
  headers: {
    "x-apikey": "63be7360969f06502871ad7f",
    "Content-Type": "application/json",
  },
};
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest);
    axios
      .get(URI, CONFIG)
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUserFailure(errorMsg));
      });
  };
};

export const fetchUser = (id) => {
  return (dispatch) => {
    axios
      .get(`${URI}/${id}`, CONFIG)
      .then((response) => {
        console.log("response>>>", response);
        dispatch(fetchUserById(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateUser = (user, id) => {
  return (dispatch) => {
    axios
      .patch(`${URI}/${id}`, user, CONFIG)
      .then((response) => {
        console.log("response>>>", response);
        dispatch(userUpdateById(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
