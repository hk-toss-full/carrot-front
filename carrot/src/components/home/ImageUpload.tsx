import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const maxImages = 5;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length > maxImages) {
      alert(`최대 ${maxImages}개의 이미지를 업로드할 수 있습니다.`);
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-start">
      <label className="cursor-pointer mb-6">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg">
          <FontAwesomeIcon icon="camera" size="lg" className="text-gray-400" />
          <div className="text-xs text-gray-600 mt-0.5">
            {images.length}/{maxImages}
          </div>
        </div>
      </label>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="relative ml-2">
            <img
              src={URL.createObjectURL(image)}
              alt={`uploaded-${index}`}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <FontAwesomeIcon
              icon="circle-xmark"
              size="lg"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
