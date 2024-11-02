import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../api/userApi";
import { UserGetResponse } from "../../../api/types/userResponse";

const useGetUser = (accessToken: string) => {
  return useQuery<UserGetResponse, Error>(
    ["userData"],
    () => UserApi.getUserData(),
    {
      enabled: !!accessToken,
      staleTime: 5 * 60 * 1000,
      onError: (error: Error) => {
        console.error("Failed to fetch user data:", error.message);
      },
    }
  );
};

export default useGetUser;
