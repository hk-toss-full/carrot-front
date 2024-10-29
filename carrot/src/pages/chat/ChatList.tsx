import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const ChatList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/chat/rooms");
        setChatRooms(response.data);
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
            <Link to={`/chat/${room.chatRoomId}`}>
              <div className="p-2 bg-gray-200 rounded">{room.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
