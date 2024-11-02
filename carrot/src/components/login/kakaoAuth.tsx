import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { KakaoResponseType } from "../../api/types/kakoResponse";
import { useSignIn } from "../../hooks/queries/login/useSignIn";

const KakaoAuth: React.FC = () => {
  const location = useLocation();
  const signInMutate = useSignIn();
  const searchParams = new URLSearchParams(location.search);
  const kakaoAuthCode = searchParams.get("code");

  useEffect(() => {
    const handleGetKakaoToken = async (code: string) => {
      try {
        const responseData: AxiosResponse<KakaoResponseType> = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_APP_CLIENT_ID,
            client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
            redirect_uri: import.meta.env.VITE_APP_REDIRECT_URL,
            code: code,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        console.log("카카오 로그인 성공", responseData.data.access_token);
        localStorage.setItem("KakaoToken", responseData.data.access_token);

        signInMutate.mutate({
          token: responseData.data.access_token,
        });
      } catch (e) {
        console.error("로그인 실패", e);
      }
    };

    if (kakaoAuthCode) {
      void handleGetKakaoToken(kakaoAuthCode);
    }
  }, []);

  return (
    <div>
      <span>로그인 중...</span>
    </div>
  );
};

export default KakaoAuth;
