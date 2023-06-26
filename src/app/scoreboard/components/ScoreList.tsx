"use client";

import { useState } from "react";
import ListContent from "./ListContent";
import Pagination from "@/components/Pagination/Pagination";

interface ScoreListProps {
  users: {
    rank: number;
    name: string;
    nim: string;
    score: number;
  }[];
}

const ScoreList: React.FC<ScoreListProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const handlePageChange = (page: number | string) => {};

  return (
    <>
      <div className="w-full h-[15rem] md:h-[30rem] lg:h-[30rem]"></div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {users.slice(firstPostIndex, lastPostIndex).map((user) => (
          <ListContent
            key={user.nim}
            name={user.name}
            nim={user.nim}
            score={user.score}
            rank={user.rank}
          />
        ))}
      </div>
      {/* <Pagination totalDataCount={users.length} currentPage={currentPage} pageSize={postPerPage} onPageChange={handlePageChange}/> */}
    </>
  );
};

export default ScoreList;
