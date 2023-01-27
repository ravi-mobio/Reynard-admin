import axios from "axios";
import Sessions from "utils/Sessions";

const unauthorizedApiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authorizedApiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Sessions.userToken}`,
  },
});

export default unauthorizedApiService;
