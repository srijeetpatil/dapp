import axios from "axios";
import { getFromStore } from "./localstore";

var os = require("os");

var uri = "/";

if (os.hostname().indexOf("local") > -1) {
  uri = "http://localhost:3000/";
}

const axiosConfig = axios.create({
  baseURL: uri,
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
