import React from "react";
import { useLocation } from "react-router-dom";

const PostDetail: React.FC = () => {
  const location = useLocation();
  const { title, location: postLocation, time, price } = location.state || {};

  const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const description = "상태 최상이에요.";

  return (
    <div className="m-[-16px] relative flex flex-col h-full">
      {/* 상단 이미지 및 뒤로가기, 홈 버튼 */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <button className="p-2 rounded-full">뒤로가기</button>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <button className="p-2 rounded-full">홈</button>
        </div>

        {/* 이미지 슬라이더 */}
        <div className="w-full h-80 overflow-x-auto flex snap-x snap-mandatory scrollbar-hide bg-gray-300">
          {images.map((image, index) => (
            <div key={index} className="flex-none w-full h-full snap-start">
              <img
                src={image}
                alt={`product-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="p-4">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-gray-500 text-sm">
          {postLocation} ・ {time}
        </p>
        <p className="mt-4">{description}</p>
      </div>

      {/* 하단 고정 버튼 영역 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] flex items-center justify-between bg-white p-4 border-t">
        <button className="flex items-center">
          <span>찜</span>
        </button>
        <span className="text-lg font-bold">{price}</span>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
