import axios from "axios";

const BASE_URL = "https://belek22.pythonanywhere.com/api/";

export const $api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Application: "JSON",
  },
});
