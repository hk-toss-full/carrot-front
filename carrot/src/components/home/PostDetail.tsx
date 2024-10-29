import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PostDetail: React.FC = () => {
  const location = useLocation();
  const {
    title,
    location: postLocation,
    time,
    price,
    isReserved,
    images,
  } = location.state || {};

  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const nickname = "당근";
  const category = "디지털기기";
  const description = "상태 최상이에요.";

  return (
    <div className="m-[-16px] relative flex flex-col h-full">
      {/* 상단 이미지 및 뒤로가기 버튼 */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          <FontAwesomeIcon
            icon="chevron-left"
            size="xl"
            className="text-white"
            onClick={handleBackClick}
          />
        </div>

        {/* 이미지 슬라이더 */}
        <div className="w-full h-80 overflow-x-auto flex snap-x snap-mandatory scrollbar-hide bg-gray-300">
          {images.map(
            (
              image: string | undefined,
              index: React.Key | null | undefined
            ) => (
              <div
                key={index}
                className="flex-none w-full h-full snap-start flex items-center justify-center bg-gray-300"
              >
                <img
                  src={image}
                  alt={`product-${index}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* 유저 정보 */}
      <div className="p-4 flex items-center border-b">
        <FontAwesomeIcon
          icon="circle-user"
          size="2xl"
          className="text-gray-400"
        />
        <div className="ml-3">
          <div className="text-sm font-bold">{nickname}</div>
          <div className="text-xs">{postLocation}</div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="p-4">
        <h1 className="text-lg font-bold">
          {isReserved && <span className="text-green-500 mr-1">예약중</span>}
          {title}
        </h1>
        <p className="text-gray-500 text-sm">
          {category} ・ {time}
        </p>
        <p className="mt-4">{description}</p>
      </div>

      {/* 하단 고정 버튼 영역 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] flex items-center justify-between bg-white p-4 border-t">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={isLiked ? faSolidHeart : faRegularHeart}
            size="xl"
            className={`pr-3 cursor-pointer ${
              isLiked ? "text-red-600" : "text-gray-400"
            }`}
            onClick={toggleLike}
          />
          <span className="text-lg font-bold border-l pl-5">{price}</span>
        </div>
        <button className="bg-orange text-xs text-white px-4 py-2 rounded">
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
