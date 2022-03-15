import axios from "../utils/axiosConfig";

export const getAllUsers = async () => {
  let responseFromApi;
  try {
    responseFromApi = axios.get("/admin/users");
  } catch (err) {
    console.error(err);
  }

  return responseFromApi;
};
