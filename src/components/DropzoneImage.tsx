"use client";

import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Image from "next/image";

interface DropzoneProps {
  onFileUpload: (file: File) => void;
}

const DropzoneImage: React.FC<DropzoneProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("File must be an image");
        return;
      }

      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <div className="w-full aspect-square bg-neutral-500 relative rounded-md">
      {selectedFile ? (
        <Image
          src={URL.createObjectURL(selectedFile)}
          alt="selected"
          className="w-full h-full object-cover object-center rounded-md"
          width={100}
          height={100}
        />
      ) : (
        <div className="w-full h-full bg-neutral-100 flex justify-center items-center text-neutral-400 font-sen">
          Upload an image
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="absolute p-3 bg-primaryDark-400 text-white rounded-xl bottom-0 right-0 translate-x-1/4 translate-y-1/4 cursor-pointer"
      >
        <HiPencil size={32} />
      </label>
    </div>
  );
};

export default DropzoneImage;
