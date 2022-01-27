import axios from "../utils/axiosConfig";

export const signup = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);

      let obj = await axios.post("/auth/signup", formdata);
      return resolve(obj);
    } catch (e) {
      return reject(e);
    }
  });
};

export const login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);

      let obj = await axios.post("/auth/login", formdata);
      return resolve(obj);
    } catch (e) {
      return reject(e);
    }
  });
};

export const getMyProfile = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let obj = await axios.get("/auth/get-my-profile");
      return resolve(obj);
    } catch (e) {
      return reject(e);
    }
  });
};
