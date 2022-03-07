import axios from "axios";
import { getFromStore } from "./localstore";

const axiosConfig = axios.create({
  baseURL: "https://supportmycause-backend.herokuapp.com/",
});

axiosConfig.interceptors.request.use(
  function (config) {
    let Token = getFromStore("auth");
    if (Token) config.headers["Authorization"] = "Bearer " + Token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
