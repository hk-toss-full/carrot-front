import { FinalResponse } from "./commonType";

export type AuthResponse = FinalResponse<{
  userId: number;
  randomId: string;
  accessToken: string;
  refreshToken: string;
}>;
