import { $apiClient } from "@/shared/api/api";
import { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

export enum EnumTokens {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "token",
}

export const getAccessToken = () => {
  const cookies = parseCookies();

  return cookies.accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  setCookie(null, EnumTokens.ACCESS_TOKEN, accessToken, {
    maxAge: 600,
    path: "/",
  });
};

export const removeFromStorage = () => {
  destroyCookie(undefined, EnumTokens.ACCESS_TOKEN);
};

export async function generateTokens() {
  try {
    const res = await $apiClient.post("/users/generate-tokens");

    if (res.data.accessToken) saveTokenStorage(res.data.accessToken);
  } catch (error) {
    // @ts-ignore
    if ((error as AxiosError).response?.data?.redirect) {
      // @ts-ignore
      window.location.href = (error as AxiosError).response?.data?.redirect;
    }
    throw new Error((error as Error).message);
  }
}
