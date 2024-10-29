/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "./FloatButton";
import image1_1 from "../../images/image1-1.webp";
import image1_2 from "../../images/image1-2.webp";
import image2_1 from "../../images/image2.webp";
import image3_1 from "../../images/image3-1.webp";
import image3_2 from "../../images/image3-2.webp";
import image3_3 from "../../images/image3-3.webp";
import image4_1 from "../../images/image4-1.webp";
import image4_2 from "../../images/image4-2.webp";
import image5_1 from "../../images/image5-1.webp";
import image5_2 from "../../images/image5-2.webp";
import image5_3 from "../../images/image5-3.webp";
import image5_4 from "../../images/image5-4.webp";

interface Post {
  id: number;
  title: string;
  location: string;
  time: string;
  price: string;
  isReserved?: boolean;
  images: string[];
}

// 더미 데이터
const initialPosts = [
  {
    title: "에어팟4 노캔버전",
    location: "방학제2동",
    time: "9분 전",
    price: "219,000원",
    images: [image1_1, image1_2],
  },
  {
    title: "애플 에어팟2",
    location: "하월곡동",
    time: "12분 전",
    price: "13,000원",
    isReserved: true,
    images: [image2_1],
  },
  {
    title: "아이폰 13미니 팝니다",
    location: "상계5동",
    time: "11분 전",
    price: "310,000원",
    images: [image3_1, image3_2, image3_3],
  },
  {
    title: "아이패드미니2 부품용",
    location: "상계6.7동",
    time: "6분 전",
    price: "10,000원",
    images: [image4_1, image4_2],
  },
  {
    title: "아이폰13미니 핑크 128g",
    location: "상봉동",
    time: "1일 전",
    price: "330,000원",
    images: [image5_1, image5_2, image5_3, image5_4],
  },
  {
    title: "에어팟4 노캔버전",
    location: "방학제2동",
    time: "9분 전",
    price: "219,000원",
    images: [image1_1, image1_2],
  },
  {
    title: "애플 에어팟2",
    location: "하월곡동",
    time: "12분 전",
    price: "13,000원",
    isReserved: true,
    images: [image2_1],
  },
  {
    title: "아이폰 13미니 팝니다",
    location: "상계5동",
    time: "11분 전",
    price: "310,000원",
    images: [image3_1, image3_2, image3_3],
  },
  {
    title: "아이패드미니2 부품용",
    location: "상계6.7동",
    time: "6분 전",
    price: "10,000원",
    images: [image4_1, image4_2],
  },
  {
    title: "아이폰13미니 핑크 128g",
    location: "상봉동",
    time: "1일 전",
    price: "330,000원",
    images: [image5_1, image5_2, image5_3, image5_4],
  },
];

// id를 자동으로 생성
const posts: Post[] = initialPosts.map((post, index) => ({
  id: index + 1, // 1부터 시작하는 id
  ...post, // 나머지 속성들을 복사
}));

const PostItem: React.FC<Post> = ({
  id,
  title,
  location,
  time,
  price,
  isReserved,
  images,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${id}`, {
      state: { title, location, time, price, isReserved, images },
    });
  };

  return (
    <div onClick={handleClick} className="flex border-b py-4 cursor-pointer">
      <div className="w-[92px] h-[92px] bg-gray-300 rounded-md mr-4">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="justify-between">
        <div>
          <h2>{title}</h2>
          <p className="text-xs text-gray-600">
            {location} ・ {time}
          </p>
          {isReserved && (
            <span className="text-green-500 text-xs font-bold mr-1">
              예약중
            </span>
          )}
          <span className="text-sm font-bold">{price}</span>
        </div>
      </div>
    </div>
  );
};

const PostList: React.FC = () => {
  return (
    <div className="max-w-[600px] mx-auto pb-10">
      {posts.map((post, id) => (
        <PostItem key={id} {...post} />
      ))}
      <FloatButton />
    </div>
  );
};

export default PostList;

// 연동코드
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import FloatButton from "./FloatButton";

// interface Post {
//   id: number;
//   title: string;
//   location: string;
//   time: string;
//   price: string;
//   status: string;
// }

// // 시간 차이를 계산하는 함수
// const formatTimeDifference = (createdAt: string): string => {
//   const now = new Date();
//   const createdDate = new Date(createdAt);
//   const diffInMinutes = Math.floor(
//     (now.getTime() - createdDate.getTime()) / 60000
//   );
//   const diffInHours = Math.floor(diffInMinutes / 60);
//   const diffInDays = Math.floor(diffInHours / 24);

//   if (diffInDays >= 1) {
//     return `${diffInDays}일 전`;
//   } else if (diffInHours >= 1) {
//     return `${diffInHours}시간 전`;
//   } else if (diffInMinutes >= 1) {
//     return `${diffInMinutes}분 전`;
//   } else {
//     return "방금";
//   }
// };

// const PostList: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8083/api/v1/items/");
//         const fetchedPosts = response.data.data.map(
//           (item: any, index: number) => ({
//             id: index + 1,
//             title: item.itemTitle,
//             location: "중림동",
//             time: formatTimeDifference(item.updatedAt),
//             price: "100,000",
//             status: item.status,
//           })
//         );

//         setPosts(fetchedPosts); // 상태 업데이트
//       } catch (err: any) {
//         setError(err.message); // 에러 처리
//       } finally {
//         setLoading(false); // 로딩 종료
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <div>로딩 중...</div>;
//   }

//   if (error) {
//     return <div>오류: {error}</div>;
//   }

//   return (
//     <div className="max-w-[600px] mx-auto pb-10">
//       {posts.map((post) => (
//         <PostItem key={post.id} {...post} />
//       ))}
//       <FloatButton />
//     </div>
//   );
// };

// const PostItem: React.FC<Post> = ({
//   id,
//   title,
//   location,
//   time,
//   price,
//   status,
// }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/posts/${id}`, {
//       state: { title, location, time, price, status },
//     });
//   };

//   return (
//     <div onClick={handleClick} className="flex border-b py-4 cursor-pointer">
//       {/* 이미지 부분 (회색 div로 대체) */}
//       <div className="w-[92px] h-[92px] bg-gray-300 rounded-md mr-4"></div>
//       <div className="justify-between">
//         <div>
//           <h2>{title}</h2>
//           <p className="text-xs text-gray-600">
//             {location} ・ {time}
//           </p>
//           {status === "RESERVED" && (
//             <span className="text-green-500 text-xs font-bold mr-1">
//               예약중
//             </span>
//           )}
//           <span className="text-sm font-bold">{price}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostList;
