"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const NavDashboard = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <div className="w-full overflow-auto">
        <div className="w-[166.67%] lg:w-full h-auto flex items-center">
          <ul className="w-full h-auto flex items-center lg:justify-center py-0 gap-0">
            <button
              className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]"
              onClick={() => router.push("/dashboard/add-module")}
            >
              <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                <div
                  className={`w-full h-[6px] bg-[#E6B93D] 
                  ${pathName.startsWith("/dashboard/add-assignment") && "translate-x-[100%]"} 
                  ${pathName.startsWith("/dashboard/grade-assignment") && "translate-x-[200%]"}
                  ${pathName.startsWith("/dashboard/edit-scoreboard") && "translate-x-[300%]"}
                  transition`}
                ></div>
                <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                  ADD MODULE
                </p>
                {/* <div className="w-full h-[6px] bg-white"></div> */}
              </li>
            </button>
            <button
              className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]"
              onClick={() => router.push("/dashboard/add-assignment")}
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
              onClick={() => router.push("/dashboard/grade-assignment")}
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
              onClick={() => router.push("/dashboard/edit-scoreboard")}
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
