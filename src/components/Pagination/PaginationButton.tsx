"use client";

import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
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
  const [iconSize, setIconSize] = useState("20px");
  useEffect(() => {
    function getIconSize() {
      if (window.innerWidth < 768) {
        return "20px";
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        return "24px";
      } else {
        return "28px";
      }
    }

    function handleResize() {
      setIconSize(getIconSize());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="text-[12px] font-bold"
    >
      <IconContext.Provider value={{ style: { fontSize: iconSize } }}>
        {isDirectionRight ? (
          <LuChevronsRight color={"#8C3E11"} />
        ) : (
          <LuChevronsLeft color={"#8C3E11"} />
        )}
      </IconContext.Provider>
    </button>
  );
}
