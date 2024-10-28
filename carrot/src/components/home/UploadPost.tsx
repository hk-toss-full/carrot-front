import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const UploadPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [acceptOffer, setAcceptOffer] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log({ title, price, acceptOffer, description });
  };

  return (
    <div className="pb-20">
      <div className="mx-[-16px] flex items-center px-3 pb-3 border-b mb-6">
        <FontAwesomeIcon icon="chevron-left" />
        <span className="ml-4 font-bold">내 물건 팔기</span>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={30}
          className="border border-gray-300 p-3 w-full rounded text-sm"
          placeholder="제목"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">거래 가격</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded text-sm"
          placeholder="가격을 입력해주세요."
        />
        <label className="text-sm">
          <input
            type="checkbox"
            checked={acceptOffer}
            onChange={(e) => setAcceptOffer(e.target.checked)}
            className="mt-3 border-gray-200 accent-orange color-white"
          />
          <span className="ml-2">가격 제안 받기</span>
        </label>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">자세한 설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-3 w-full h-40 rounded text-sm"
          placeholder="올릴 게시글 내용을 작성해 주세요.&#13;&#10;&#13;&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요."
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        className="fixed bottom-0 left-0 bg-orange text-white p-3 text-sm font-bold rounded w-full"
      >
        작성 완료
      </button>
    </div>
  );
};

export default UploadPost;
