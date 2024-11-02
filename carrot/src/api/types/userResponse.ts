import { FinalResponse } from "./commonType";

export type UserGetResponse = FinalResponse<{
  nickname: string;
  randomId: string;
}>;

export type UserPutRequest = {
  nickname: string;
};
