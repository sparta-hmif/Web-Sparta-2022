"use client";

export interface PaginationNumberProps {
  pageNumber?: number | string;
  isDots?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export default function PaginationNumber({
  pageNumber,
  isDots = false,
  isActive = false,
  isDisabled = false,
  onClick,
}: PaginationNumberProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`flex w-[9%] max-w-[3rem] aspect-square text-base md:text-xl text-primaryDark-400 ${
        isActive ? "bg-primaryLight-700 scale-110" : ""
      } justify-center items-center font-bold font-sen ${
        !isDots ? "border-[3px] border-primaryDark-400 rounded-full " : ""
      } ${
        !isActive && !isDots
          ? "border-2 border-primaryLight-700 hover:bg-primaryLight-400 ease-out duration-300"
          : ""
      }`}
    >
      {isDots ? "..." : pageNumber}
    </button>
  );
}
