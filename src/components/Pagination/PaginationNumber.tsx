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
      className={`flex w-[24px] h-[24px] md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px] ${
        isActive ? "bg-primaryLight-700" : ""
      } justify-center items-center text-[12px] lg:text-[14px] font-bold text-secondary-400 font-sen ${
        !isDots ? "border border-black rounded-full " : ""
      } ${
        !isActive && !isDots
          ? "border-2 border-primaryLight-700 hover:bg-primaryLight-400 ease-out duration-500"
          : ""
      }`}
    >
      {isDots ? "..." : pageNumber}
    </button>
  );
}
