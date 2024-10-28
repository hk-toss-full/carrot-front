import React from "react";
import { useNavigate } from "react-router-dom";

const FloatButton: React.FC = () => {
  const navigate = useNavigate();

  const handlerWriteClick = () => {
    navigate("/write");
  };

  return (
    <button
      onClick={handlerWriteClick}
      className="fixed bottom-[80px] right-5 bg-orange text-white py-1 px-4 rounded-full flex items-center justify-center"
    >
      <span className="text-2xl pb-1.5">+</span>
      <span className="ml-0.5 text-sm">글쓰기</span>
    </button>
  );
};

export default FloatButton;
