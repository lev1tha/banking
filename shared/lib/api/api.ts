import axios from "axios";

const BASE_URL = "https://belek11.pythonanywhere.com/api/";

export const $api = axios.create({
  baseURL: BASE_URL,
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isAuthenticated: boolean | null = null;
let checkInterval: NodeJS.Timeout | null = null;

export const startGlobalChecker = (interval: number = 300000) => {
  if (checkInterval) {
    clearInterval(checkInterval);
  }

  checkInterval = setInterval(async () => {
    await globalAfterCheckerUser();
  }, interval);
};

export const globalAfterCheckerUser = async (): Promise<boolean> => {
  if (isAuthenticated !== null) {
    return isAuthenticated;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    isAuthenticated = false;
    return isAuthenticated;
  }

  try {
    const response = await $api.get("auth/profile");
    isAuthenticated = response.status === 200 || response.status === 202;
    return isAuthenticated;
  } catch (error) {
    console.error("Request failed:", error);
    isAuthenticated = false;
    return isAuthenticated;
  }
};

startGlobalChecker();
