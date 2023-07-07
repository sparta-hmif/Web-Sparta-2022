"use client";

import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

// Component imports
import Button from "@/components/Button";
import TextFields from "@/components/TextFields";
import Pagination from "@/components/Pagination/Pagination";

import { formatDate } from "../../../assignment/components/Preview";

export interface assignmentProps {
  rank: number;
  nim: number;
  name: string;
  status: boolean;
  link: string;
}

export interface assignmentDetailProps {
  title?: string;
  dayNumber?: number;
  startTime?: string;
  endTime?: string;
  data?: assignmentProps[];
  uploadCount?: number;
  totalSpartan?: number;
}

const AssignmentRow = ({ rank, nim, name, status, link }: assignmentProps) => {
  return (
    <div className="grid grid-cols-10 bg-primaryLight-400 border-b-[2px] border-secondaryDark-100 gap-1 px-[5px] py-[10px] items-center justify-center text-center">
      <div className="">{rank}</div>
      <div className="col-span-2">{nim}</div>
      <div className="col-span-3">
        <div className="">{name}</div>
      </div>

      <div className="col-span-2">{status ? "Submitted" : "Missing"}</div>
      {link ? (
        <div className="col-span-2 lg:mx-5">
          <Link href={link} className="blockk w-full" target="blank">
            <Button isPrimary={true} text="Open" />
          </Link>
        </div>
      ) : null}
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

let pageSize = 10;

const AssignmentDetail = ({
  title,
  dayNumber,
  startTime,
  endTime,
  uploadCount,
  totalSpartan,
  data,
}: assignmentDetailProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(3);

  const [filteredData, setFilteredData] = useState<assignmentProps[]>(
    data || []
  );
  const [currShowingData, setCurrShowingData] = useState<assignmentProps[]>([]);

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data || []);
      return;
    }
    const newArray =
      data?.filter(
        (data) =>
          data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.nim.toString().includes(searchQuery.toLowerCase())
      ) || [];
    setFilteredData(newArray);
  }, [data, searchQuery]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrShowingData(filteredData.slice(firstPageIndex, lastPageIndex));
  }, [filteredData, currentPage]);

  return (
    <div className="">
      <div className="flex mx-[10px] md:mx-[100px] lg:mx-[220px] items-center gap-2 mb-4 cursor-pointer">
        <FaChevronLeft size={20} className="text-primaryDark-400" />
        <p className="font-sen font-bold text-xl text-primaryDark-400">Back</p>
      </div>
      <div className="">
        <div className="flex flex-wrap lg:flex-col-reverse justify-between mx-[20px] md:mx-[110px] lg:mx-[245px] pt-2">
          <div className="font-koulen break-words leading-[44px] lg:leading-normal max-w-[65%] text-[40px] md:text-[50px] md:max-w-[420px] font-bold text-primaryDark-400 lg:text-h2 lg:font-normal">
            {title}
          </div>
          <div className="font-hammersmith text-[14px] lg:flex lg:gap-5 lg:items-center ">
            <div className="text-right lg:text-left md:text-[22px] lg:text-h4">
              DAY {dayNumber}
            </div>
            <div className="text-primary-400 border-2 text-[10px] md:text-[13px] lg:text-[16px] lg:flex lg:items-center lg:h-[50%] border-primary-400 rounded-xl px-4 py-[2px]">
              {uploadCount || 0} / {totalSpartan || 0}
            </div>
          </div>
        </div>
        <div className="font-sen font-semibold text-caption lg:flex lg:gap-[30px] lg:mb-5 md:text-[16px] lg:text-[20px] mx-[20px] md:mx-[110px] lg:mx-[245px] ">
          <div className="">
            Start : {startTime ? formatDate(new Date(startTime)) : ""}
          </div>
          <div className="">
            End : {endTime ? formatDate(new Date(endTime)) : ""}
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
            {currShowingData.map((data, idx) => {
              return (
                <AssignmentRow
                  rank={pageSize * (currentPage - 1) + idx + 1}
                  nim={data.nim}
                  name={data.name}
                  status={data.status}
                  key={idx}
                  link={data.link}
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
