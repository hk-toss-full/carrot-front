import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserApi from "../../../api/userApi";
import { UserPutRequest } from "../../../api/types/userResponse";

const usePutNickname = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UserPutRequest>(
    (data: UserPutRequest) => UserApi.updateNickname(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userData"]);
      },
      onError: (error: Error) => {
        console.error("Failed to update nickname:", error.message);
      },
    }
  );
};

export default usePutNickname;
