"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import Pagination from "@/components/Pagination/Pagination";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import TextFields from "@/components/TextFields";
import SingleRow from "./SingleRow";
import ScoreboardHeader from "./ScoreboardHeader";

let pageSize = 10;

export function sortData(arr: Array<dataProp>) {
  return arr.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  });
}

export interface retrievedData {
  nim: number;
  name: string;
  score: number;
}
export interface dataProp {
  rank: number;
  nim: number;
  name: string;
  score: number;
}

export default function Scoreboard({ data }: { data: dataProp[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const [filteredData, setFilteredData] = useState<dataProp[]>(data);
  const [currShowingData, setCurrShowingData] = useState<dataProp[]>([]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
      return;
    }
    const newArray = data.filter(
      (data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.nim.toString().includes(searchQuery.toLowerCase())
    );
    setFilteredData(sortData(newArray));
  }, [searchQuery, data]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrShowingData(filteredData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, filteredData]);

  return (
    <div className="mx-[15px] md:mx-[100px] lg:mx-[235px]">
      <div className="flex gap-2 max-h-[35px] lg:max-h-[45px] mt-6 mb-6">
        <TextFields
          onChange={handleSearchQueryChange}
          value={searchQuery}
          placeholder="Search"
        />
      </div>
      <div className="text-caption lg:text-sub-1 font-bold font-sen text-primaryDark-400 ">
        <ScoreboardHeader />
        {currShowingData.map((data, idx) => {
          return (
            <SingleRow
              rank={data.rank}
              nim={data.nim}
              name={data.name}
              score={data.score}
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
              if (typeof page === "string") {
                return;
              }
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
}
