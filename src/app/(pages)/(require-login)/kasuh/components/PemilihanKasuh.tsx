"use client";

import { useEffect, useState } from "react";
import TextFields from "@/components/TextFields";
import Pagination from "@/components/Pagination/Pagination";
import KasuhCard from "./KasuhCard";

import {
  usePagination,
  usePaginationDispatch,
} from "../context/PaginationContext";

let pageSize = 10;

export interface dataProp {
  nim: string;
  name: string;
  kuota: number;
  image: string;
  pendaftar?: number;
}

export default function PemilihanKasuh({ data }: { data: dataProp[] }) {
  // const [currentPage, setCurrentPage] = useState(1);

  const currentPage = usePagination();
  const dispatchPage = usePaginationDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
    // setCurrentPage(1);
    dispatchPage({ type: "SET_PAGE", payload: 1 });
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
    setFilteredData(newArray);
  }, [searchQuery, data]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrShowingData(
      filteredData && filteredData.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, filteredData]);

  return (
    <>
      <div className="w-full">
        <TextFields
          onChange={handleSearchQueryChange}
          value={searchQuery}
          placeholder="Search"
        />
        {currShowingData &&
          currShowingData.map((data, idx) => {
            return (
              <KasuhCard
                nim={data.nim}
                name={data.name}
                key={idx}
                kuota={data.kuota}
                image={data.image}
                pendaftar={data.pendaftar}
              />
            );
          })}
        <div className=" mb-[90px] mt-[20px]">
          <Pagination
            totalDataCount={filteredData && filteredData.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page) => {
              if (typeof page === "string") {
                return;
              }
              // setCurrentPage(page);
              dispatchPage({ type: "SET_PAGE", payload: page });
            }}
          />
        </div>
      </div>
    </>
  );
}
