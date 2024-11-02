import React from "react";
import kakaoLoginBtn from "@/assets/kakaoLoginBtn.png";

const KakaoButton: React.FC = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_APP_CLIENT_ID
  }&client_secret=${import.meta.env.VITE_APP_CLIENT_SECRET}&redirect_uri=${
    import.meta.env.VITE_APP_REDIRECT_URL
  }&response_type=code`;

  function handleKakaoLogin() {
    window.location.href = kakaoURL;
  }

  return (
    <div onClick={handleKakaoLogin}>
      <img
        src={kakaoLoginBtn}
        alt="Kakao Login"
        style={{ width: "50vw", maxWidth: "200px" }}
      />
    </div>
  );
};

export default KakaoButton;
