import axios from "axios";

const BASE_URL = "/";

const $api = axios.create({
  baseURL: BASE_URL,
});
