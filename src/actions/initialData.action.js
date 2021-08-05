import axios from "../helpers/axios";
import { categoryConstansts, productConstants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.get(`/initialData`);
    if (res.status === 200) {
      const { products, categories } = res.data;
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          categories,
        },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          products,
        },
      });
    }
  };
};
