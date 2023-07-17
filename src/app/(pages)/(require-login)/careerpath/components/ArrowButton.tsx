"use client";

import { IconContext } from "react-icons";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

interface ArrowButtonProps {
  onArrowClick: (evt: React.TouchEvent | React.MouseEvent) => void;
  isDirectionDown: boolean;
}

const Icon = (props: ArrowButtonProps) => {
  const { onArrowClick, isDirectionDown } = props;
  return (
    <IconContext.Provider value={{ color: "white", size: "26px" }}>
      <div
        className="flex justify-center items-center max-h-[20px]"
        onClick={onArrowClick}
        onTouchEnd={onArrowClick}
      >
        {isDirectionDown && <BsChevronCompactDown />}
        {!isDirectionDown && <BsChevronCompactUp />}
      </div>
    </IconContext.Provider>
  );
};

const ArrowButton = (props: ArrowButtonProps) => {
  return <Icon {...props} />;
};

export default ArrowButton;
