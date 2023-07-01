import React from "react";
import Preview from "./Preview";

interface AssignmentProps {
  judulTugas: string;
  dayTugas: number;
  startDate: Date;
  endDate: Date;
  deskripsi: string;
  attachment: string[];
  submission: string[];
  isSubmitted: boolean;
}

interface AssignmentListProps {
  assignments: AssignmentProps[];
}

const AssignmentList = ({ assignments }: AssignmentListProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full py-10 gap-5">
      {assignments.map((assignment) => (
        <Preview {...assignment} />
      ))}
    </div>
  );
};

export default AssignmentList;
