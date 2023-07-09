"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavDashboard = () => {
  const pathName = usePathname();

  return (
    <>
      <div className="w-full overflow-auto">
        <div className="w-[166.67%] lg:w-full h-auto flex items-center">
          <ul className="w-full h-auto flex items-center lg:justify-center py-0 gap-0">
            <div className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]">
              <Link href="/dashboard/add-module">
                <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                  <div
                    className={`w-full h-[6px] bg-[#E6B93D] 
                  ${
                    pathName?.startsWith("/dashboard/add-assignment") &&
                    "translate-x-[100%]"
                  } 
                  ${
                    pathName?.startsWith("/dashboard/grade-assignment") &&
                    "translate-x-[200%]"
                  }
                  ${
                    pathName?.startsWith("/dashboard/edit-scoreboard") &&
                    "translate-x-[300%]"
                  }
                  transition`}
                  ></div>
                  <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                    ADD MODULE
                  </p>
                  {/* <div className="w-full h-[6px] bg-white"></div> */}
                </li>
              </Link>
            </div>

            <div className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]">
              <Link href="/dashboard/add-assignment">
                <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                  <div className={`w-full h-[6px]`}></div>
                  <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                    ADD ASSIGNMENT
                  </p>
                </li>
              </Link>
            </div>

            <div className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]">
              <Link href="/dashboard/grade-assignment">
                <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                  <div className={`w-full h-[6px]`}></div>
                  <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                    GRADE ASSIGNMENT
                  </p>
                </li>
              </Link>
            </div>

            <div className="w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF]">
              <Link href="/dashboard/edit-scoreboard">
                <li className="w-full h-auto flex flex-col justify-center items-center pt-0 pb-3 gap-y-2">
                  <div className={`w-full h-[6px]`}></div>
                  <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                    EDIT SCOREBOARD
                  </p>
                </li>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavDashboard;
