import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const ChatMessage: React.FC = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  let stompClient: any;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }

    const socket = new SockJS("http://localhost:8082/chat");
    stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      (frame) => {
        console.log("Connected: " + frame);
        stompClient.subscribe(`/topic/messages/${chatRoomId}`, (message) => {
          const messageData = JSON.parse(message.body);
          setMessages((prev) => [...prev, messageData]);
        });
      },
      (error) => {
        console.error("Connection error: ", error);
      }
    );

    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/chat/messages/${chatRoomId}`
        );
        setMessages(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [chatRoomId, navigate]);

  const sendMessage = async () => {
    const messageData = {
      chatRoomId,
      text: input,
      userId: "user",
    };

    try {
      await axiosInstance.post("/api/v1/chat/message", messageData);

      setInput("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">채팅 방 {chatRoomId}</h1>
      <div className="border border-gray-300 p-4 mb-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 border border-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white"
          onClick={sendMessage}
        >
          보내기
        </button>
      </div>
    </div>
  );
};

export default ChatMessage;
