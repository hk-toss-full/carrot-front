import React from "react";

const KakaoLoginButton: React.FC = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
      onClick={handleKakaoLogin}
    >
      카카오 로그인
    </button>
  );
};

export default KakaoLoginButton;
