import axios from "../utils/axiosConfig";

// All request related APIs

export async function getRequestById(shortId) {
  let responseFromApi;
  try {
    responseFromApi = await axios.get(`/requests/${shortId}`);
  } catch (err) {
    console.error(err);
  }

  return responseFromApi;
}

export async function getAllRequests() {
  let response;
  try {
    let allRequests = await axios.get("/requests/");
    response = allRequests;
  } catch (err) {
    console.error(err);
  }

  return response;
}

export async function createRequest(title, content, type, eth_address) {
  let responseFromApi;
  try {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type", type);
    formData.append("eth_address", eth_address);
    responseFromApi = await axios.post("/requests/create", formData);
  } catch (err) {
    console.error(err);
  }

  return responseFromApi;
}

// All chat related APIs

export async function initiateChat(reciever, message) {
  let responseFromApi;
  try {
    let formData = new FormData();
    formData.append("reciever", reciever);
    formData.append("message", message);
    responseFromApi = await axios.post("/chat/initiate", formData);
  } catch (err) {
    console.error(err);
  }

  return responseFromApi;
}
