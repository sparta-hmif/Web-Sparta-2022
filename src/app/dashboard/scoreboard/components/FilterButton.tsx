"use client";

import { useState } from "react";
import { IconContext } from "react-icons";
import { LuChevronDown } from "react-icons/lu";

const FilterButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [arrowColor, setArrowColor] = useState("#E6B93D");
  const handleClick = () => {
    setIsClicked(!isClicked);
    if (arrowColor === "#E6B93D") {
      setArrowColor("#FFFFFF");
    } else {
      setArrowColor("#E6B93D");
    }
  };
  const clickedClass = "focus:bg-primary-400";
  return (
    <button
      className={`flex border-[3px] border-primary-400 rounded-xl text-[12px] lg:text-sub-1 font-bold font-sen justify-center items-center px-4 lg:px-7 gap-4 hover:cursor-pointer hover:shadow ease-in duration-150 ${
        isClicked ? clickedClass : ""
      }`}
      onClick={() => {
        handleClick();
      }}
    >
      <div
        className={`text-primary-400 ${
          isClicked ? "text-white" : ""
        } ease-in duration-150`}
      >
        Filter
      </div>
      <div className="ease-in duration-150">
        <IconContext.Provider value={{ style: { fontSize: 18 } }}>
          <LuChevronDown color={arrowColor} />
        </IconContext.Provider>
      </div>
    </button>
  );
};

export default FilterButton;
