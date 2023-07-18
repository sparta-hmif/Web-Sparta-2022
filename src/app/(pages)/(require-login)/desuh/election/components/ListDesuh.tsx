"use client";

import Pagination from "@/components/Pagination/Pagination";
import DesuhCard from "./DesuhCard";
import { useMemo, useState } from "react";

interface DesuhProps {
  nama: string;
  nim: string;
  alasan: string;
  photoUrl: string;
  accepted?: boolean;
}

const ListDesuh = ({ data }: { data: DesuhProps[] }) => {
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const currentShowingData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * postPerPage;
    const lastPageIndex = firstPageIndex + postPerPage;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, postPerPage, data]);

  return (
    <div>
      <div className="mb-5 lg:mb-[54px]">
        {currentShowingData.map((desuh, index) => (
          <DesuhCard
            key={index}
            nama={desuh.nama}
            nim={desuh.nim}
            alasan={desuh.alasan}
            photoUrl={desuh.photoUrl}
            accepted={desuh.accepted}
          />
        ))}
      </div>
      <Pagination
        totalDataCount={data.length}
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
  );
};

export default ListDesuh;
