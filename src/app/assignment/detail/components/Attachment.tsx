"use client";

import React from "react";
import Image from "next/image";
import { AttachmentProps } from "@/components/LinkAttachment";


const Attachment = ({
  link,
  judul = "Attachment",
}: AttachmentProps) => {
  return (
    <button
      className="flex flex-row bg-primaryLight-600 rounded-xl py-3 px-4 w-[200px] gap-2 items-center hover:scale-[1.05] active:scale-[0.98] transition-all"
      onClick={() => {
        window.open(link, "_blank");
      }}
    >
      <Image
        src={"/images/assignment/File.svg"}
        alt="File"
        width={100}
        height={100}
        className="w-2/12"
      />
      <div className="font-sen text-button font-bold truncate text-primaryDark-400">{judul}</div>
    </button>
  );
};

export default Attachment;
