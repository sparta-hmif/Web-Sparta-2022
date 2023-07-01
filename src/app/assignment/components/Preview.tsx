import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

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

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const Preview = (props: AssignmentProps) => {
  const { judulTugas, dayTugas, endDate, isSubmitted } = props;
  const today = new Date();
  return (
    <div className="w-full max-w-[1200px] px-10">
      <div
        className={`flex flex-col justify-start ${
          isSubmitted
            ? "bg-primaryLight-400"
            : endDate!.getTime() < today.getTime()
            ? "bg-danger-100"
            : "bg-white"
        } rounded-2xl border-2 border-primaryDark-400 py-5 px-8`}
      >
        <div className="font-sen text-sub-1 md:text-h6 font-bold">
          DAY {dayTugas}
        </div>
        <div className="font-hammersmith text-h5 md:text-h4 leading-6 pt-2 pb-1">
          {judulTugas?.toUpperCase()}
        </div>
        <div className="font-sen text-body-2 md:text-body-1">
          Due Date : {formatDate(endDate!)}
        </div>
        <div className="flex justify-end w-full font-sen pt-2">
          <Link href="/assignment/detail" className="w-[150px]">
            <Button isPrimary={true} text="Open" type="button" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Preview;
