import { authConstants, initialDataConstants } from "../actions/constants";

const initState = {
  products: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case initialDataConstants.GET_ALL_INITIAL_DATA_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case initialDataConstants.GET_ALL_INITIAL_DATA_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
