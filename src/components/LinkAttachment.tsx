"use client";

import { useState, useRef, useEffect, RefObject } from "react";
import Button from "./Button";
import LinkElement from "./LinkElement";

interface LinkAttachmentProps {
  linkArray: Array<AttachmentProps>;
  addLink: (link: AttachmentProps) => void;
  deleteLink: (index: number) => void;
}

export interface AttachmentProps {
  judul: string;
  link: string;
}

const LinkAttachment: React.FC<LinkAttachmentProps> = ({
  linkArray,
  addLink,
  deleteLink,
}) => {
  const [link, setLink] = useState<AttachmentProps>({
    judul: linkArray[0]?.judul || "",
    link: linkArray[0]?.link || "",
  });

  useEffect(() => {
    setLink({
      judul: linkArray[0]?.judul || "",
      link: linkArray[0]?.link || "",
    });
  }, [linkArray]);

  const handleAddLink = () => {
    if (link.judul === "" || link.link === "") return;
    addLink(link);
    setLink({
      judul: "",
      link: "",
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {linkArray.map((link, idx) => (
          <LinkElement
            key={idx}
            link={link.judul}
            deleteLink={deleteLink}
            idx={idx}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row mt-3 gap-4">
        <input
          type="text"
          name="judul"
          className="w-full py-2 px-3 text-sm font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400"
          placeholder="Tambahkan Judul"
          value={link.judul}
          onChange={handleChange}
        />
        <input
          type="text"
          name="link"
          className="w-full py-2 px-3 text-sm font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400"
          placeholder="Tambahkan Link"
          value={link.link}
          onChange={handleChange}
        />

        <button
          type="button"
          className="bg-secondary-400 w-full md:w-1/4 py-2 text-button text-white font-bold rounded-xl"
          onClick={handleAddLink}
        >
          Add Link
        </button>
      </div>
    </div>
  );
};

export default LinkAttachment;
