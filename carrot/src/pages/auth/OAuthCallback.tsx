import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (code: string) =>
      axiosInstance.post(`/api/v1/oauth/kakao/login`, null, {
        params: { code },
      }),
    onSuccess: (response) => {
      console.log(response.data);
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");

    if (authorizationCode) {
      mutate(authorizationCode);
    } else {
      console.error("Authorization code is missing.");
    }
  }, [mutate]);

  return <div>로그인 중...</div>;
};

export default OAuthCallback;
