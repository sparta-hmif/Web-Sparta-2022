"use client";

import TextFields from "@/components/TextFields";
import Pagination from "@/components/Pagination/Pagination";
import { useMemo, useState } from "react";
import Button from "@/components/Button";
import { FaChevronLeft } from "react-icons/fa";

interface assignmentProps {
  rank: number;
  nim: number;
  name: string;
  status: boolean;
}

const AssignmentRow = ({ rank, nim, name, status }: assignmentProps) => {
  return (
    <div className="grid grid-cols-10 bg-primaryLight-400 border-b-[2px] border-secondaryDark-100 gap-1 px-[5px] py-[10px] items-center justify-center text-center">
      <div className="">{rank}</div>
      <div className="col-span-2">{nim}</div>
      <div className="col-span-3">
        <div className="">{name}</div>
      </div>

      <div className="col-span-2">{status ? "Submitted" : "Missing"}</div>
      <div className="col-span-2 lg:mx-5">
        <Button isPrimary={true} text="Open" />
      </div>
    </div>
  );
};

const AssignmentScoreboardHeader = () => {
  return (
    <>
      <div className="grid grid-cols-10 gap-1 mt-[10px] py-[10px] px-[5px] justify-center text-center bg-primary-400 border-b-2 border-primaryDark-400">
        <div className=" ">Rank</div>
        <div className="col-span-2">NIM</div>
        <div className="col-span-3">Name</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Action</div>
      </div>
    </>
  );
};

let originalData = [
  { nim: 18222013, name: "Riva Hacksby", status: false },
  { nim: 18222017, name: "Craig Goodered", status: true },
  { nim: 18222017, name: "Huntlee Bollis", status: false },
  { nim: 18222007, name: "Derk Chate", status: true },
  { nim: 18222008, name: "Wainwright Eastop", status: true },
  { nim: 18222003, name: "Giorgi Donnel", status: false },
  { nim: 18222020, name: "Bria Dunbar", status: false },
  { nim: 18222014, name: "Saxe Hallen", status: false },
  { nim: 18222019, name: "Cahra Sickamore", status: true },
  { nim: 18222008, name: "Jane Zimmerman", status: true },
  { nim: 18222010, name: "Ema Heeps", status: false },
  { nim: 18222002, name: "Elenore Franciotti", status: false },
  { nim: 18222016, name: "Lottie Brodie", status: true },
  { nim: 18222009, name: "Dex Scoble", status: false },
  { nim: 18222016, name: "Mick Scrinage", status: true },
  { nim: 18222019, name: "Alasdair Scorah", status: true },
  { nim: 18222006, name: "Brannon Josse", status: true },
  { nim: 18222017, name: "Adora De Ferrari", status: true },
  { nim: 18222017, name: "Slade Chaters", status: true },
  { nim: 18222014, name: "Lemmie Badsworth", status: true },
];
let pageSize = 10;

interface AssignmentDetailProps {
  dayNumber: number;
  judul: string;
  haveUploaded?: number;
  startTime?: Date;
  endTime?: Date;
  onClose: () => void;
}

const AssignmentDetail = ({
  dayNumber,
  judul,
  haveUploaded,
  startTime,
  endTime,
  onClose,
}: AssignmentDetailProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(3);

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return originalData;
    }
    const newArray = originalData.filter(
      (data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.nim.toString().includes(searchQuery.toLowerCase())
    );
    return newArray;
  }, [searchQuery]);

  const currentShowingData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);
  return (
    <div className="">
      <div
        className="flex mx-[10px] md:mx-[100px] lg:mx-[220px] items-center gap-2 mb-4 cursor-pointer"
        onClick={onClose}
      >
        <FaChevronLeft size={20} className="text-primaryDark-400" />
        <p className="font-sen font-bold text-xl text-primaryDark-400">Back</p>
      </div>
      <div className="">
        <div className="flex flex-wrap lg:flex-col-reverse justify-between mx-[20px] md:mx-[110px] lg:mx-[245px] pt-2">
          <div className="font-koulen break-words leading-[44px] lg:leading-normal max-w-[65%] text-[40px] md:text-[50px] md:max-w-[420px] font-bold text-primaryDark-400 lg:text-h2 lg:font-normal">
            {judul}
          </div>
          <div className="font-hammersmith text-[14px] lg:flex lg:gap-5 lg:items-center ">
            <div className="text-right lg:text-left md:text-[22px] lg:text-h4">
              DAY {dayNumber}
            </div>
            <div className="text-primary-400 border-2 text-[10px] md:text-[13px] lg:text-[16px] lg:flex lg:items-center lg:h-[50%] border-primary-400 rounded-xl px-4 py-[2px]">
              {haveUploaded ? haveUploaded : 0} / 999
            </div>
          </div>
        </div>
        <div className="font-sen font-semibold text-caption lg:flex lg:gap-[30px] lg:mb-5 md:text-[16px] lg:text-[20px] mx-[20px] md:mx-[110px] lg:mx-[245px] ">
          <div className="">
            Start : {startTime ? startTime.toString() : "DD-MM-YY 23:59"}
          </div>
          <div className="">
            End : {endTime ? endTime.toString() : "DD-MM-YY 23:59"}
          </div>
        </div>
        <div className="mx-[15px] md:mx-[100px] lg:mx-[235px]">
          <div className="flex gap-2 max-h-[35px] lg:max-h-[45px] mt-6 mb-6">
            <TextFields
              onChange={handleSearchQueryChange}
              value={searchQuery}
              placeholder="Search"
            />
          </div>
          <div className="text-caption lg:text-sub-1 font-bold font-sen text-primaryDark-400 ">
            <AssignmentScoreboardHeader />
            {currentShowingData.map((data, idx) => {
              return (
                <AssignmentRow
                  rank={pageSize * (currentPage - 1) + idx + 1}
                  nim={data.nim}
                  name={data.name}
                  status={data.status}
                  key={idx}
                />
              );
            })}
            <div className="flex justify-center mt-5 align-center pb-5">
              <Pagination
                totalDataCount={filteredData.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={(page) => {
                  if (typeof page === "number") {
                    setCurrentPage(page);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
