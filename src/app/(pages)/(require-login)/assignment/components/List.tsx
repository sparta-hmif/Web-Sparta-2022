import React from "react";
import Preview from "./Preview";

export interface AssignmentProps {
  id: string;
  judulTugas: string;
  dayTugas: number;
  endDate: Date;
  isSubmitted: boolean;
}

interface AssignmentListProps {
  assignments: AssignmentProps[];
}

const AssignmentList = ({ assignments }: AssignmentListProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full py-10 gap-5 container mx-auto max-w-[60rem]">
      {assignments.map((assignment, index) => (
        <Preview key={index} {...assignment} />
      ))}
    </div>
  );
};

export default AssignmentList;
