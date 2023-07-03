"use client";

import React from "react";
import {
  BsFileEarmarkPdfFill,
  BsFileEarmarkImageFill,
  BsFileEarmarkPlayFill,
  BsFileEarmarkMusicFill,
  BsFileEarmarkTextFill,
} from "react-icons/bs";

interface AttachmentProps {
  link: string;
  title?: string;
  type?: string;
}

const Attachment = ({
  link,
  title = "Attachment Title",
  type = "other",
}: AttachmentProps) => {
  return (
    <button
      className="flex flex-row bg-primaryLight-600 rounded-xl py-3 px-4 w-[200px] gap-2 items-center hover:scale-[1.05] active:scale-[0.98] transition-all"
      onClick={() => {
        window.open(link, "_blank");
      }}
    >
      <div>
        {type === "video" ? (
          <BsFileEarmarkPlayFill size={30} color="#661E29" />
        ) : type === "image" ? (
          <BsFileEarmarkImageFill size={30} color="#661E29" />
        ) : type === "pdf" ? (
          <BsFileEarmarkPdfFill size={30} color="#661E29" />
        ) : type === "audio" ? (
          <BsFileEarmarkMusicFill size={30} color="#661E29" />
        ) : (
          <BsFileEarmarkTextFill size={30} color="#661E29" />
        )}
      </div>
      <div className="font-sen text-button font-bold truncate">{title}</div>
    </button>
  );
};

export default Attachment;
