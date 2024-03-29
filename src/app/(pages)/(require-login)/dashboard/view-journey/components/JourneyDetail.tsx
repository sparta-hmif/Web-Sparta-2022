"use client";

import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

// Component imports
import Button from "@/components/Button";
import TextFields from "@/components/TextFields";
import Pagination from "@/components/Pagination/Pagination";
import JourneyModal from "./JourneyModal";

import { formatDate } from "../../../assignment/components/Preview";

export interface journeyProps {
  rank: number;
  nim: string;
  name: string;
  status: boolean;
  rating: number;
  reflection: string;
  story: string;
}

export interface journeyDetailProps {
  number?: number;
  date?: Date;
  data?: journeyProps[];
  uploadCount?: number;
  totalSpartan?: number;
}

const JourneyRow = ({
  rank,
  nim,
  name,
  status,
  onOpen,
}: journeyProps & { onOpen: () => void }) => {
  return (
    <div className="grid grid-cols-10 bg-primaryLight-400 border-b-[2px] border-secondaryDark-100 gap-1 px-[5px] py-[10px] items-center justify-center text-center">
      <div className="">{rank}</div>
      <div className="col-span-2">{nim}</div>
      <div className="col-span-3">
        <div className="">{name}</div>
      </div>

      <div className="col-span-2">{status ? "Submitted" : "Missing"}</div>
      {status ? (
        <div className="col-span-2 lg:mx-5">
          <Button isPrimary={true} text="Open" onClick={onOpen} />
        </div>
      ) : null}
    </div>
  );
};

const JourneyScoreboardHeader = () => {
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

const JourneyDetail = ({
  number,
  date,
  uploadCount,
  totalSpartan,
  data,
}: journeyDetailProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(3);
  const [modalContent, setModalContent] = useState({
    name: "",
    nim: "",
    rating: 0,
    story: "",
    reflection: "",
    isVisible: false,
  });

  const [filteredData, setFilteredData] = useState<journeyProps[]>(data || []);
  const [currShowingData, setCurrShowingData] = useState<journeyProps[]>([]);

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
      {modalContent.isVisible ? (
        <JourneyModal
          {...modalContent}
          onClose={() =>
            setModalContent({
              name: "",
              nim: "",
              rating: 0,
              story: "",
              reflection: "",
              isVisible: false,
            })
          }
        />
      ) : null}
      <Link href="/dashboard/view-journey">
        <div className="flex mx-[10px] md:mx-[100px] lg:mx-[220px] items-center gap-2 mb-4 cursor-pointer">
          <FaChevronLeft size={20} className="text-primaryDark-400" />
          <p className="font-sen font-bold text-xl text-primaryDark-400">
            Back
          </p>
        </div>
      </Link>
      <div className="">
        <div className="flex flex-wrap lg:flex-col-reverse justify-between mx-[20px] md:mx-[110px] lg:mx-[245px] pt-2">
          <div className="font-hammersmith text-[14px] lg:flex lg:gap-5 lg:items-center ">
            <div className="text-right lg:text-left md:text-[22px] lg:text-h4">
              DAY {number}
            </div>
            <div className="text-primary-400 border-2 text-[10px] md:text-[13px] lg:text-[16px] lg:flex lg:items-center lg:h-[50%] border-primary-400 rounded-xl px-4 py-[2px]">
              {uploadCount || 0} / {totalSpartan || 0}
            </div>
          </div>
        </div>
        <div className="font-sen font-semibold text-caption lg:flex lg:gap-[30px] lg:mb-5 md:text-[16px] lg:text-[20px] mx-[20px] md:mx-[110px] lg:mx-[245px] ">
          <div className="">
            Date : {date ? formatDate(new Date(date)) : ""}
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
            <JourneyScoreboardHeader />
            {currShowingData.map((data, idx) => {
              return (
                <JourneyRow
                  {...data}
                  rank={pageSize * (currentPage - 1) + idx + 1}
                  key={idx}
                  onOpen={() =>
                    setModalContent({
                      ...data,
                      isVisible: true,
                    })
                  }
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

export default JourneyDetail;
