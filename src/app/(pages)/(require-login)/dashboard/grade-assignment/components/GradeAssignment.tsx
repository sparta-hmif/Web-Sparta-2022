"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import Assignment from "./Assignment";

const GradeAssignment = () => {
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_WEB_URL + "/api/all-tugas",
    fetcher
  );

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="container mx-auto py-10">
      {(data as any[]).map((assignment, index) => (
        <Assignment
          key={index}
          {...assignment}
          // onClick={() => setIsDetail(index)}
        />
      ))}
    </div>
  );
};

export default GradeAssignment;
