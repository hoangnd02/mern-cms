import { pageConstants } from "../actions/constants";

const initialState = {
  pages: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case pageConstants.CREATE_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        pages: action.payload.page,
      };
      break;
    case pageConstants.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
