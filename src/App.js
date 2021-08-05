import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signin from "./containers/Signin";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Product from "./containers/Products";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/auth.actions";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import { getAllcategory } from "./actions/category.action";
import { getInitialData } from "./actions/initialData.action";
import Page from "./containers/Page";
import { getCustomerOrders } from "./actions";

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      dispatch(getCustomerOrders());
    } else {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/products" component={Product} />
        <PrivateRoute exact path="/page" component={Page} />
        <PrivateRoute exact path="/orders" component={Orders} />
        <PrivateRoute exact path="/category" component={Category} />

        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
