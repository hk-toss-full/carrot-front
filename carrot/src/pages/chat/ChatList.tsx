/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";

const ChatList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchChatRooms = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/v1/chat/rooms");
  //       setChatRooms(response.data);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchChatRooms();
  // }, []);

  useEffect(() => {
    const fetchChatRooms = async () => {
      // 더미 데이터 생성
      const dummyData = [
        { chatRoomId: 1, name: "친구와의 대화" },
        { chatRoomId: 2, name: "가족 그룹" },
        { chatRoomId: 3, name: "직장 동료" },
        { chatRoomId: 4, name: "운동 모임" },
        { chatRoomId: 5, name: "여행 계획" },
      ];

      try {
        // API 호출 대신 더미 데이터를 사용
        setChatRooms(dummyData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">채팅 방 목록</h1>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.chatRoomId} className="mb-2">
            <Link to={`/chat/rooms/${room.chatRoomId}`}>
              <div className="p-2 bg-gray-200 rounded">{room.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
