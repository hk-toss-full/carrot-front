import React from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  title: string;
  location: string;
  time: string;
  price: string;
  isReserved?: boolean;
}

// 더미 데이터
const posts: Post[] = [
  {
    title: "에어팟4 노캔버전",
    location: "방학제2동",
    time: "9분 전",
    price: "219,000원",
  },
  {
    title: "애플 에어팟2",
    location: "하월곡동",
    time: "12분 전",
    price: "13,000원",
    isReserved: true,
  },
  {
    title: "아이폰 13미니 팝니다",
    location: "상계5동",
    time: "11분 전",
    price: "310,000원",
  },
  {
    title: "아이패드미니2 부품용",
    location: "상계6.7동",
    time: "6분 전",
    price: "10,000원",
  },
  {
    title: "아이폰13미니 핑크 128g",
    location: "상봉동",
    time: "1일 전",
    price: "330,000원",
  },
];

const PostItem: React.FC<Post & { index: number }> = ({
  title,
  location,
  time,
  price,
  isReserved,
  index,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${index}`, { state: { title, location, time, price } });
  };

  return (
    <div onClick={handleClick} className="flex border-b py-4 cursor-pointer">
      {/* 이미지 부분 (회색 div로 대체) */}
      <div className="w-[92px] h-[92px] bg-gray-300 rounded-md mr-4"></div>
      <div className="justify-between">
        <div>
          <h2>{title}</h2>
          <p className="text-xs text-gray-600">
            {location} ・ {time}
          </p>
          {isReserved && (
            <span className="text-green-500 text-xs mr-1">예약중</span>
          )}
          <span className="text-sm font-bold">{price}</span>
        </div>
      </div>
    </div>
  );
};

const PostList: React.FC = () => {
  return (
    <div>
      {posts.map((post, index) => (
        <PostItem key={index} index={index + 1} {...post} />
      ))}
    </div>
  );
};

export default PostList;
