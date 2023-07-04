"use client";

import { useState } from "react";
import Assignment from "./Assignment";
import AssignmentDetail from "./AssignmentDetail";

const GradeAssignment = () => {
  const data = [
    {
      judul: "NAMA TUGAS 1",
      dayNumber: 1,
      haveUploaded: 10,
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      judul: "NAMA TUGAS 2",
      dayNumber: 2,
      haveUploaded: 14,
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      judul: "NAMA TUGAS 3",
      dayNumber: 3,
      haveUploaded: 20,
      startTime: new Date(),
      endTime: new Date(),
    },
  ];
  const [isDetail, setIsDetail] = useState(-1);

  if (isDetail !== -1)
    return (
      <div className="container mx-auto py-10">
        <AssignmentDetail {...data[isDetail]} onClose={() => setIsDetail(-1)} />
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      {data.map((assignment, index) => (
        <Assignment
          key={assignment.judul}
          {...assignment}
          onClick={() => setIsDetail(index)}
        />
      ))}
    </div>
  );
};

export default GradeAssignment;
