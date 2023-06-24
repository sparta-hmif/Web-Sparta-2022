"use client";

import Pagination from "@/components/Pagination/Pagination";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import testData from "@/components/Pagination/testData";
import TextFields from "@/components/TextFields";
import FilterButton from "./components/FilterButton";
import SingleRow from "./components/SingleRow";
import ScoreboardHeader from "./components/ScoreboardHeader";
import Button from "@/components/Button";
import { IconContext } from "react-icons";
import { LuChevronDown } from "react-icons/lu";

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
    console.log(event.target);
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
  }, [originalData, searchQuery]);

  const currentShowingData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  return (
    <div className="mx-[15px] lg:mx-[100px]">
      <div className="flex gap-2 max-h-[35px] mt-3">
        <TextFields
          onChange={handleSearchQueryChange}
          value={searchQuery}
          placeholder="Search"
        />
        <FilterButton />
      </div>
      <div className=" text-label lg:text-sub-1 font-bold font-sen text-primaryDark-400 ">
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
        <div className="flex justify-center mt-3 align-center">
          <Pagination
            totalDataCount={filteredData.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
