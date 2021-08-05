import axios from "../helpers/axios";
import { authConstants, categoryConstansts } from "./constants";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`/product/create`, form);
    if (res.status === 201) {
      dispatch({
        type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.product },
      });
    } else {
      dispatch({
        type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
