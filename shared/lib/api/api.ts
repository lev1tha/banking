import axios from "axios";

const BASE_URL = "https://belek11.pythonanywhere.com/api/";

export const $api = axios.create({
  baseURL: BASE_URL,
});
