"use client";

import clsx from "clsx";
import { MouseEventHandler } from "react";

const Button = ({
  isPrimary,
  text,
  onClick,
  type,
  color,
  disabled,
}: {
  isPrimary: boolean;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "reset" | "submit" | undefined;
  color?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        transition
        w-full 
        py-3 px-2 font-sen
        ${isPrimary ? "border-none" : "border-[3px]"}
        border-secondary-400
        ${isPrimary ? (color ? color : "bg-secondary-400") : "bg-white"}
        rounded-xl md:rounded-2xl
        font-bold 
        ${isPrimary ? "text-white" : "text-secondary-400"}
        text-xs md:text-base
        hover:drop-shadow-[0_3px_6px_rgba(188,83,23,0.55)]
        ${isPrimary ? "active:bg-[#BC5317]" : "active:bg-secondary-400"}       
        active:text-white
        disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-400 disabled:hover:drop-shadow-none
        `}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
