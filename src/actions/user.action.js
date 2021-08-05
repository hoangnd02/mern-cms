import axios from "../helpers/axios";
import { userContants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userContants.USER_REGISTER_REQUEST,
    });

    const res = await axios.post(`/signup`, {
      ...user,
    });

    if (res.status === 200) {
      const { message } = res.data;

      dispatch({
        type: userContants.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userContants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
