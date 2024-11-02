import React from "react";
import { useEffect, useState } from "react";
import KakaoButton from "../../components/login/KakaoButton";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem("isLoading") === "true") setIsLoading(true);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {isLoading ? (
          <p className="text-center">로딩 중...</p>
        ) : (
          <KakaoButton />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
