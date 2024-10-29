import React from "react";
import BottomNav from "../../components/common/BottomNav";
import KakaoLoginButton from "../../components/KakaoLoginButton";

const MyPage: React.FC = () => {
  return (
    <div>
      <KakaoLoginButton />
      <BottomNav />
    </div>
  );
};

export default MyPage;
