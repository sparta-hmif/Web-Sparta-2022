"use client";

import Pagination from "@/components/Pagination/Pagination";
import DesuhCard from "./DesuhCard";
import { useMemo, useState } from "react";
import { KeyedMutator } from "swr";

interface DesuhProps {
  id: string;
  nama: string;
  nim: string;
  alasan: string;
  photoUrl: string;
  accepted?: number;
  rank: number;
  isEligible: boolean;
}

const ListDesuh = ({
  data,
  mutate,
}: { data: DesuhProps[] } & { mutate: KeyedMutator<any> }) => {
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
            pendaftaranId={desuh.id}
            nama={desuh.nama}
            nim={desuh.nim}
            alasan={desuh.alasan}
            photoUrl={desuh.photoUrl}
            accepted={desuh.accepted}
            rank={desuh.rank}
            eligible={desuh.isEligible}
            mutate={mutate}
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
