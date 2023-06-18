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
      className={`flex w-[25px] h-[25px] ${
        isActive
          ? "bg-primaryLight-700"
          : " hover:bg-primaryLight-400 ease-out duration-500"
      } justify-center items-center text-[10px] lg:text-[13px] font-bold text-secondary-400 font-sen ${
        !isDots ? "border border-black rounded-full" : ""
      } ${!isActive && !isDots ? "border-2 border-primaryLight-700" : ""}`}
    >
      {isDots ? "..." : pageNumber}
    </button>
  );
}
