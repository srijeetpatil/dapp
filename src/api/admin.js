import axios from "../utils/axiosConfig";

export const getAllUsers = async () => {
  let responseFromApi;
  try {
    responseFromApi = await axios.get("/admin/users");
  } catch (err) {
    console.error(err);
  }

  return responseFromApi;
};

export const verifyRequest = async (id, value) => {
  let responseFromApi;
  try {
    let formData = new FormData();
    formData.append("value", value);
    responseFromApi = await axios.post("/admin/verify/" + id, formData);
  } catch (err) {
    console.error(err);
  }

  return responseFromApi;
};

export const verifyUser = async (id, value) => {
  let responseFromApi;
  try {
    let formData = new FormData();
    formData.append("value", value);
    formData.append("id", id);
    responseFromApi = await axios.post("/admin/users/verify", formData);
  } catch (err) {
    console.error(err);
  }

  return responseFromApi;
};
