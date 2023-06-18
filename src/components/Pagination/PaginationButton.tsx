"use client";

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
      {isDirectionRight ? ">" : "<"}
    </button>
  );
}
