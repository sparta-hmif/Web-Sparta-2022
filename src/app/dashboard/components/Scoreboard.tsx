"use client";

import Pagination from "@/components/Pagination/Pagination";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import TextFields from "@/components/TextFields";
import FilterButton from "./FilterButton";
import SingleRow from "./SingleRow";
import ScoreboardHeader from "./ScoreboardHeader";
import testData from "./testData";

let pageSize = 10;
let originalData = sortData(testData);

function sortData(arr: Array<retrievedData>) {
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

export default function Scoreboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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
    return sortData(newArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalData, searchQuery]);

  const currentShowingData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  return (
    <div className="mx-[15px] md:mx-[100px] lg:mx-[235px]">
      <div className="flex gap-2 max-h-[35px] lg:max-h-[45px] mt-6 mb-6">
        <TextFields
          onChange={handleSearchQueryChange}
          value={searchQuery}
          placeholder="Search"
        />
        <FilterButton />
      </div>
      <div className="text-caption lg:text-sub-1 font-bold font-sen text-primaryDark-400 ">
        <ScoreboardHeader />
        {currentShowingData.map((data, idx) => {
          return (
            <SingleRow
              rank={pageSize * (currentPage - 1) + idx + 1}
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
