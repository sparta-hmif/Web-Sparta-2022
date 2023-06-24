"use client";

import { useState } from "react";
import Button from "./Button";
import LinkElement from "./LinkElement";

interface LinkAttachmentProps {
  linkArray: Array<string>;
  addLink: (link: string) => void;
  deleteLink: (index: number) => void;
}

const LinkAttachment: React.FC<LinkAttachmentProps> = ({
  linkArray,
  addLink,
  deleteLink,
}) => {  
  const [link, setLink] = useState<string>("");

  const handleAddLink = () => {
    if (link === "") return;
    addLink(link);
    setLink("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {linkArray.map((link, idx) => (
          <LinkElement key={idx} link={link} deleteLink={deleteLink} idx={idx}/>
        ))}
      </div>
      <div className="flex mt-3">
        <input
          type="text"
          id="judul"
          className="w-full py-2 px-3 text-[8px] font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-l-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400 lg:text-[16px]"
          placeholder="Tambahkan Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="button" className="bg-secondary-400 w-3/12 sm:w-2/12 lg:w-1/12 text-button text-white font-bold rounded-r-lg" onClick={handleAddLink}>
          Add
        </button>
      </div>
    </div>
  );
};

export default LinkAttachment;
