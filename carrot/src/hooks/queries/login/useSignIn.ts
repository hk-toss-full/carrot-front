import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../../api/authApi";
import { AuthResponse } from "../../../api/types/authResponse";

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation<AuthResponse, Error>(() => AuthApi.postSignIn(), {
    onSuccess: (response: AuthResponse) => {
      localStorage.setItem("userId", response.data.userId.toString());
      localStorage.setItem("randomId", response.data.randomId);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate("/mypage");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });
};
