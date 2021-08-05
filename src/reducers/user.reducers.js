import { authConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        message: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
