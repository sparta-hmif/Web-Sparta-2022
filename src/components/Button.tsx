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
      className={
        `
        transition
        w-full 
        py-3 px-2
        ${isPrimary ? "border-none" : "border-[3px]"}
        border-secondary-400
        ${isPrimary ? "bg-secondary-400" : "bg-white"}
        rounded-xl md:rounded-2xl
        font-bold 
        ${isPrimary ? "text-white" : "text-secondary-400"}
        text-xs md:text-base
        hover:drop-shadow-[0_3px_6px_rgba(188,83,23,0.55)]
        ${isPrimary ? "active:bg-[#BC5317]" : "active:bg-secondary-400"}       
        active:text-white
        `
      }
    >
      {text}
    </button>
  );
};

export default Button;
