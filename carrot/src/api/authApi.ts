import axiosInstance from "./axiosInstance";
import { AuthResponse } from "./types/authResponse";

const BASE_URL = "/api/v1/oauth/kakao";

export default class AuthApi {
  static async postSignIn(): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(`${BASE_URL}`);
    return response.data;
  }

  static async refreshAccessToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token found");

    const response = await axiosInstance.post<{ accessToken: string }>(
      `${BASE_URL}/refresh`,
      { refreshToken }
    );

    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }

    return newAccessToken;
  }
}
