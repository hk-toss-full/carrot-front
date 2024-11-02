import axiosInstance from "./axiosInstance";
import { UserGetResponse, UserPutRequest } from "./types/userResponse";

const BASE_URL = "/api/v1";

export default class UserApi {
  static async getUserData(): Promise<UserGetResponse> {
    const response = await axiosInstance.get<UserGetResponse>(`${BASE_URL}`, {
      headers: { requiresAuth: true },
    });

    return response.data;
  }

  static async updateNickname(data: UserPutRequest): Promise<UserGetResponse> {
    const response = await axiosInstance.put<UserGetResponse>(
      `${BASE_URL}`,
      data,
      {
        headers: { requiresAuth: true },
      }
    );
    return response.data;
  }
}
