"use client";

import { useMemo, useState } from "react";
import ListContent from "./ListContent";
import Pagination from "@/components/Pagination/Pagination";

interface ScoreListProps {
  users: {
    rank: number;
    name: string;
    nim: string;
    score: number;
    image?: string;
  }[];
  userRank: number;
}

const ScoreList: React.FC<ScoreListProps> = ({ users, userRank }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);

  const currentShowingData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * postPerPage;
    const lastPageIndex = firstPageIndex + postPerPage;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, postPerPage, users]);

  return (
    <>
      <div className="w-[95%] mx-auto flex flex-col justify-center items-center gap-4">
        {currentShowingData.map((user, idx) => {
          let isUser = false;
          if (user.rank === userRank) {
            isUser = true;
          }
          return <ListContent key={idx} {...user} isUser={isUser} />;
        })}
        <div className="my-5 w-full flex items-center justify-center">
          <Pagination
            totalDataCount={users.length}
            currentPage={currentPage}
            pageSize={postPerPage}
            onPageChange={(page) => {
              if (typeof page === "string") {
                return;
              }
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ScoreList;
