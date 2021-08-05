import axios from "axios";
import { authConstants } from "../actions/constants";
import { api } from "../urlConfig";
import store from "../store";

const token = localStorage.getItem("token");
const axiosInstant = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstant.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstant.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { state } = error.response;
    if (state === 500 || state === 400) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
  }
);
export default axiosInstant;
