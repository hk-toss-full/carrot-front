import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface ImageUploadProps {
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImages }) => {
  const [images, localSetImages] = useState<File[]>([]);
  const maxImages = 5;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length > maxImages) {
      alert(`최대 ${maxImages}개의 이미지를 업로드할 수 있습니다.`);
      return;
    }
    const newImages = [...images, ...files];
    localSetImages(newImages);
    setImages(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    localSetImages(newImages);
    setImages(newImages);
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
        <div className="flex flex-col items-center justify-center w-20 h-20 border border-gray-300 rounded-lg">
          <FontAwesomeIcon icon="camera" size="xl" className="text-gray-400" />
          <div className="text-sm text-gray-600 mt-0.5">
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
              className="w-20 h-20 object-cover rounded-lg"
            />
            <FontAwesomeIcon
              icon="circle-xmark"
              size="lg"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
