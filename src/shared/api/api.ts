import axios, { AxiosError } from "axios";
import {
  generateTokens,
  getAccessToken,
  removeFromStorage,
} from "../services/auth-token.sevice";

export const $api = axios.create({
  baseURL: "/api",
});

export const $apiClient = axios.create({
  baseURL: "/api",
});

const errorCatch = (error: AxiosError): string => {
  const message = (error?.response?.data as Error).message;

  return message
    ? typeof (error.response?.data as Error).message === "object"
      ? message[0]
      : message
    : error.message;
};

$api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await generateTokens();

        return $api.request(originalRequest);
      } catch (error) {
        // if (errorCatch(error as AxiosError) === "jwt expired")
        removeFromStorage();
      }
    }
    throw error;
  },
);
