import { combineReducers } from "redux";
import userReducers from "./user.reducers";
import authReducers from "./auth.reducers";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducers";
import pageReducers from "./page.reducers";
import orderReducers from "./order.reducers";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  category: categoryReducers,
  product: productReducers,
  page: pageReducers,
  order: orderReducers,
});

export default rootReducer;
