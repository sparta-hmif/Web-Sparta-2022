import React from "react";
import Link from "next/link";
import { AssignmentProps } from "./List";

export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const Preview = (props: AssignmentProps) => {
  const { id, judulTugas, dayTugas, endDate, isSubmitted } = props;
  const today = new Date();
  const isExpired = endDate.getTime() < today.getTime();
  return (
    <div className="w-full px-10">
      <div
        className={`flex flex-col justify-start ${
          isSubmitted
            ? "bg-primaryLight-400"
            : isExpired
            ? "bg-danger-100"
            : "bg-white"
        } rounded-2xl border-2 border-primaryDark-400 py-3 md:py-5 px-5 md:px-8`}
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
        <div className="flex justify-end w-full pt-2">
          <Link href={`/assignment/${id}`} className="mt-2">
            <button
              className={`w-full py-3 px-4 md:px-6 rounded-xl font-sen text-white text-button font-bold transition ${
                isSubmitted
                  ? "bg-success-200 hover:drop-shadow-[0_3px_6px_rgba(61,213,152,0.55)]"
                  : isExpired
                  ? "bg-primaryDark-200 hover:drop-shadow-[0_3px_6px_rgba(163,48,66,0.55)]"
                  : "bg-secondary-400 hover:drop-shadow-[0_3px_6px_rgba(140,62,17,0.55)]"
              }`}
            >
              {isSubmitted ? "Submitted" : isExpired ? "Expired" : "Open"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Preview;
