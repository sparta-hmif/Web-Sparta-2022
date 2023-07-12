"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavDashboard = ({ role }: { role: string }) => {
  const pathName = usePathname();

  const allAccess = role !== "MENTOR";

  return (
    <>
      <div className="w-full overflow-auto">
        <div className="w-full h-auto flex items-center">
          <ul className="w-full h-auto flex justify-start md:justify-center gap-0 relative">
            {allAccess && (
              <div className="flex-none w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF] relative">
                <div
                  className={`w-full h-1 md:h-2 bg-primary-400 top-0 ${
                    pathName === "/dashboard/add-module"
                      ? "scale-x-100"
                      : "scale-x-0"
                  } absolute duration-300 rounded-b-md`}
                ></div>
                <Link href="/dashboard/add-module">
                  <li className="w-full h-full flex flex-col justify-center items-center pt-0 gap-y-2">
                    <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                      ADD MODULE
                    </p>
                  </li>
                </Link>
              </div>
            )}

            {allAccess && (
              <div className="flex-none w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF] relative">
                <div
                  className={`w-full h-1 md:h-2 bg-primary-400 top-0 ${
                    pathName === "/dashboard/add-assignment"
                      ? "scale-x-100"
                      : "scale-x-0"
                  } absolute duration-300 rounded-b-md`}
                ></div>
                <Link href="/dashboard/add-assignment">
                  <li className="w-full h-full flex flex-col justify-center items-center pt-0 gap-y-2">
                    <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                      ADD ASSIGNMENT
                    </p>
                  </li>
                </Link>
              </div>
            )}

            <div className="flex-none w-1/3 lg:w-1/6 max-w-60 hover:bg-[#E8DDDF] relative">
              <div
                className={`w-full h-1 md:h-2 bg-primary-400 top-0 ${
                  pathName === "/dashboard/grade-assignment"
                    ? "scale-x-100"
                    : "scale-x-0"
                } absolute duration-300 rounded-b-md`}
              ></div>
              <Link href="/dashboard/grade-assignment">
                <li className="w-full h-full flex flex-col justify-center items-center pt-0 gap-y-2">
                  <p className="font-koulen text-[14px] lg:text-[24px] text-[#E6B93D]">
                    GRADE ASSIGNMENT
                  </p>
                </li>
              </Link>
            </div>

            <div className="flex-none w-1/3 lg:w-1/6 py-3 max-w-60 hover:bg-[#E8DDDF] relative">
              <div
                className={`w-full h-1 md:h-2 bg-primary-400 top-0 ${
                  pathName === "/dashboard/edit-scoreboard"
                    ? "scale-x-100"
                    : "scale-x-0"
                } absolute duration-300 rounded-b-md`}
              ></div>
              <Link href="/dashboard/edit-scoreboard">
                <li className="w-full h-full flex flex-col justify-center items-center pt-0 gap-y-2">
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
