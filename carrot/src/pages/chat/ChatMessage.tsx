/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";
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
    // const user = localStorage.getItem("user");
    // if (!user) {
    //   navigate("/login");
    // }

    // 더미 데이터로 초기 메시지 설정
    const dummyMessages = [
      { user: "사용자1", text: "안녕하세요!" },
      { user: "사용자2", text: "안녕하세요, 반갑습니다!" },
      { user: "사용자1", text: "오늘 날씨 어때요?" },
      { user: "사용자2", text: "좋아요! 나가서 산책할 예정이에요." },
    ];

    setMessages(dummyMessages); // 더미 메시지 설정
    setLoading(false); // 로딩 완료

    const socket = new SockJS("http://localhost:8082/chat");
    stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      (frame: string) => {
        console.log("Connected: " + frame);
        stompClient.subscribe(
          `/topic/messages/${chatRoomId}`,
          (message: { body: string }) => {
            const messageData = JSON.parse(message.body);
            setMessages((prev) => [...prev, messageData]);
          }
        );
      },
      (error: any) => {
        console.error("Connection error: ", error);
      }
    );

    // const fetchMessages = async () => {
    //   try {
    //     const response = await axiosInstance.get(
    //       `/api/v1/chat/messages/${chatRoomId}`
    //     );
    //     setMessages(response.data);
    //   } catch (err: any) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchMessages();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [chatRoomId, navigate]);

  const sendMessage = async () => {
    // const messageData = {
    //   chatRoomId,
    //   text: input,
    //   userId: "user",
    // };

    // 더미 데이터로 메시지를 추가
    const newMessage = {
      user: "사용자1", // 여기에서 사용자의 이름을 정할 수 있습니다
      text: input,
    };

    // 더미 데이터에 메시지 추가
    setMessages((prev) => [...prev, newMessage]);
    setInput(""); // 입력 필드 초기화

    try {
      // await axiosInstance.post("/api/v1/chat/message", messageData);

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
