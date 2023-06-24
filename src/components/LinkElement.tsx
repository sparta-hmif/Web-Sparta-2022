"use client";

import { IoCloseSharp } from "react-icons/io5";

const LinkElement = ({
  link,
  idx,
  deleteLink,
}: {
  link: string;
  idx: number;
  deleteLink: (idx: number) => void;
}) => {
  return (
    <div className="bg-gray-300 inline-block rounded-md py-1 px-2 max-w-xs">
      <div className="flex items-center justify-between gap-2">
        <p className="pb-1 truncate flex-1">{link}</p>
        <IoCloseSharp className="cursor-pointer" onClick={() => deleteLink(idx)}/>
      </div>
    </div>
  );
};

export default LinkElement;
