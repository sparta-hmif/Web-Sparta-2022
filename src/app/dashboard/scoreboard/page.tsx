"use client";

import Pagination from "@/components/Pagination/Pagination";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import testData from "@/components/Pagination/testData";
import TextFields from "@/components/TextFields";
import Button from "@/components/Button";
import { IconContext } from "react-icons";
import { LuChevronDown, LuChevronsDown } from "react-icons/lu";

let pageSize = 10;
let data = testData;

const SearchBar = () => {
  return null;
};

const FilterButton = () => {
  return (
    <div className="flex border-[3px] border-primary-400 rounded-xl text-[12px] font-bold font-sen justify-center items-center px-4 gap-3">
      <div className="text-primary-400">Filter</div>
      <div className="">
        <IconContext.Provider value={{ style: { fontSize: 18 } }}>
          <LuChevronDown color="#E6B93D" />
        </IconContext.Provider>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <>
      <div className="grid grid-cols-10 gap-1 mt-[10px] mx-[10px] py-[10px] px-[5px] justify-center text-center bg-primary-400 border-b-2 border-primaryDark-400">
        <div className=" text-primaryDark-400 font-bold text-label">Rank</div>
        <div className="col-span-2 text-primaryDark-400 font-bold text-label">
          NIM
        </div>
        <div className="col-span-3 text-primaryDark-400 font-bold text-label">
          Name
        </div>
        <div className="col-span-2 text-primaryDark-400 font-bold text-label">
          Score
        </div>
        <div className="col-span-2 text-primaryDark-400 font-bold text-label">
          Action
        </div>
      </div>
    </>
  );
};

interface dataProp {
  rank: number;
  nim: number;
  name: string;
  score: number;
}

const SingleData = ({ rank, nim, name, score }: dataProp) => {
  return (
    <div className="grid grid-cols-10 bg-primaryLight-400 border-b-[2px] border-secondaryDark-100 gap-1 mx-[10px] px-[5px] py-[5px] items-center justify-center text-center">
      <div className=" text-primaryDark-400 font-bold text-label">{rank}</div>
      <div className="col-span-2 text-primaryDark-400 font-bold text-label">
        {nim}
      </div>
      <div className="col-span-3 text-primaryDark-400 font-bold text-label overflow-auto">
        {name}
      </div>
      <div className="col-span-2 text-primaryDark-400 font-bold text-label">
        {score}
      </div>
      <div className="col-span-2 text-primaryDark-400 font-bold text-label">
        Action
      </div>
    </div>
  );
};

export default function Scoreboard() {
  const [currentPage, setCurrentPage] = useState(1);
  data.sort((a, b) => {
    if (a.score < b.score) {
      return -1;
    }
    if (a.score > b.score) {
      return 1;
    }
    return 0;
  });
  const [userData, setUserData] = useState(data);

  const currentShowingData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, userData]);

  return (
    <>
      <div className="flex">
        <TextFields onChange={() => {}} value="dsa" width="230" />
        <FilterButton />
      </div>
      <Header />
      {currentShowingData.map((data, idx) => {
        return (
          <SingleData
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
          totalDataCount={data.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
