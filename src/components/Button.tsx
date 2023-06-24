"use client"

import clsx from "clsx";
import { MouseEventHandler } from "react";

const Button = ({
  isPrimary,
  text,
  onClick,
  type,
}: {
  isPrimary: boolean;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "reset" | "submit" | undefined;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        `
        transition
        w-full 
        py-3 
        border-4
        border-secondary-400
        bg-white
        rounded-2xl
        font-bold 
        text-secondary-400
        text-button 
        hover:drop-shadow-[0_3px_6px_rgba(188,83,23,0.55)] 
        active:bg-secondary-400
        active:text-white
        `,
        isPrimary && "text-white bg-[#8C3E12] border-none active:bg-[#BC5318]"
      )}
    >
      {text}
    </button>
  );
};

export default Button;
