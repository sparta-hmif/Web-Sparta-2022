"use client";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

export interface PaginationButtonProps {
  isDirectionRight?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
}

export default function PaginationButton({
  isDirectionRight = false,
  onClick,
  isDisabled = false,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="text-[12px] font-bold"
    >
      {isDirectionRight ? (
        <LuChevronsRight className="text-primaryDark-400 text-3xl md:text-5xl" />
      ) : (
        <LuChevronsLeft className="text-primaryDark-400 text-3xl md:text-5xl" />
      )}
    </button>
  );
}
