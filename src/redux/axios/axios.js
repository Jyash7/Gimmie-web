import axios from "axios";
import { NotificationManager } from "react-notifications";

const instance = axios.create({
  baseURL: "https://gimmie.ai/gimme/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((request) => {
  try {
    let token = sessionStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  } catch (error) {
    console.error("Error fetching token:", error);
    return Promise.reject(error);
  }
});

instance.interceptors.response.use(
  (response) => {
    // console.log("Response", response);
    return response.data;
  },
  (error) => {
    console.log("error", error);

    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access:", error);
    } else {
        NotificationManager.error('Something went wrong !');
    }

    return Promise.reject(error);
  }
);

export default instance;
