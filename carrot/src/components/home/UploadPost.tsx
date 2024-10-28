import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { useNavigate } from "react-router-dom";

const UploadPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    const imageUrls = images.map((image) => URL.createObjectURL(image));
    console.log({ images: imageUrls, title, price, description });
  };

  return (
    <div className="relative pb-20">
      <div className="mx-[-16px] flex items-center px-3 pb-3 border-b mb-5">
        <FontAwesomeIcon icon="chevron-left" onClick={handleBackClick} />
        <span className="ml-4 font-bold">내 물건 팔기</span>
      </div>

      <ImageUpload setImages={setImages} />

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={30}
          className="border border-gray-300 p-3 w-full rounded-lg text-sm"
          placeholder="제목"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">거래 가격</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg text-sm"
          placeholder="가격을 입력해주세요."
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">자세한 설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-3 w-full h-40 rounded-lg text-sm"
          placeholder="올릴 게시글 내용을 작성해 주세요.&#13;&#10;&#13;&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요."
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        className="fixed bottom-3 max-w-[568px] bg-orange text-white p-3 text-sm font-bold rounded-lg w-full"
      >
        작성 완료
      </button>
    </div>
  );
};

export default UploadPost;
