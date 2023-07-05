"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FiUpload } from "react-icons/fi";

interface AssignmentProps {
  judul: string;
  startTime?: Date;
  endTime?: Date;
  onClick?: () => void;
  haveUploaded?: number;
}

const Assignment = ({
  judul,
  startTime,
  endTime,
  onClick = () => {},
  haveUploaded = 0,
}: AssignmentProps) => {
  const [iconSize, setIconSize] = useState("14px");
  useEffect(() => {
    function getIconSize() {
      if (window.innerWidth < 768) {
        return "14px";
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        return "16px";
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        return "18px";
      } else {
        return "22px";
      }
    }

    function handleResize() {
      setIconSize(getIconSize());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="border-[2px] border-primaryDark-400 grid grid-cols-5 rounded-2xl mx-4 mt-2 md:mx-[100px] md:mt-5 lg:mx-[200px]">
      <div className="col-span-3 ml-5 mt-3 mb-3">
        <h6 className="font-hammersmith text-h6 md:text-[26px] lg:text-[30px]">
          {judul ? judul : "JUDUL TUGAS"}
        </h6>
        <div className="font-sen font-semibold text-caption md:text-[16px] lg:text-[20px]">
          <div className="">
            Start : {startTime ? startTime.toString() : "DD-MM-YY 23:59"}
          </div>
          <div className="">
            End : {endTime ? endTime.toString() : "DD-MM-YY 23:59"}
          </div>
        </div>
        <div className="flex gap-3 items-center mt-1 ml-0.5 mb-1">
          <IconContext.Provider value={{ className: "md:" }}>
            <FiUpload size={iconSize} />
          </IconContext.Provider>
          <div className="text-[14px] md:text-[16px] lg:text-[18px] font-sen">
            {haveUploaded} / 999
          </div>
        </div>
      </div>
      <div className="col-span-2 mr-4 ml-2 mb-3 md:mr-6 md:ml-4 lg:ml-[125px] lg:mr-[50px] flex flex-col justify-end">
        <Button isPrimary={true} text="Open" onClick={onClick} />
      </div>
    </div>
  );
};

export default Assignment;
