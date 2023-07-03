"use client";
import React, { useState } from "react";

const NavDashboard = ({
  activeIndex,
  handleItemClick,
}: {
  activeIndex: number;
  handleItemClick: (index: number) => void;
}) => {
  return (
    <>
      <div className="w-full overflow-auto">
        <div className="w-[166.67%] lg:w-full h-auto flex items-center">
          <ul className="w-full h-auto flex items-center lg:justify-center py-0 gap-0">
            <button
              className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]"
              onClick={() => handleItemClick(0)}
            >
              <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                <div
                  className={`w-full h-[6px] bg-[#E6B93D] ${
                    activeIndex === 1 ? "translate-x-[100%]" : ""
                  } ${activeIndex === 2 ? "translate-x-[200%]" : ""} ${
                    activeIndex === 3 ? "translate-x-[300%]" : ""
                  } ${
                    activeIndex === 4 ? "translate-x-[400%]" : ""
                  } transition`}
                ></div>
                <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                  ADD MODULE
                </p>
                {/* <div className="w-full h-[6px] bg-white"></div> */}
              </li>
            </button>
            <button
              className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]"
              onClick={() => handleItemClick(1)}
            >
              <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                <div className={`w-full h-[6px]`}></div>
                <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                  ADD ASSIGNMENT
                </p>
                {/* <div className="w-full h-[6px] bg-white"></div> */}
              </li>
            </button>
            <button
              className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]"
              onClick={() => handleItemClick(2)}
            >
              <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                <div className={`w-full h-[6px]`}></div>
                <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                  GRADE ASSIGNMENT
                </p>
                {/* <div className="w-full h-[6px] bg-white"></div> */}
              </li>
            </button>
            <button
              className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]"
              onClick={() => handleItemClick(3)}
            >
              <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                <div className={`w-full h-[6px]`}></div>
                <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                  EDIT SCOREBOARD
                </p>
                {/* <div className="w-full h-[6px] bg-white"></div> */}
              </li>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavDashboard;
