import Button from "@/components/Button";
import React from "react";
import AttachmentList from "./AttachmentList";

interface AttachmentProps {
  link: string;
  title?: string;
  type?: string;
}

interface AssignmentProps {
  judulTugas: string;
  dayTugas: number;
  startDate: Date;
  endDate: Date;
  deskripsi: string;
  attachment: AttachmentProps[];
  submission: string[];
  isSubmitted: boolean;
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

const Assignment = ({
  judulTugas,
  dayTugas,
  startDate,
  endDate,
  deskripsi,
  attachment,
  submission,
  isSubmitted,
}: AssignmentProps) => {
  return (
    <div className="flex flex-col w-full justify-center items-center py-[50px] px-10">
      <div className="flex flex-col w-full max-w-[1000px] justify-center items-start">
        <div className="flex flex-row md:flex-col justify-between w-full">
          <div className="hidden md:flex flex-row w-fit items-center gap-5">
            <div className="text-h5 md:text-h4 font-hammersmith pt-1">
              Day {dayTugas}
            </div>
            <div
              className={`font-sen text-sub-1 py-1 px-4 border-[3px] rounded-xl font-bold whitespace-nowrap ${
                isSubmitted
                  ? "text-success-200 border-success-200"
                  : "text-primary-400 border-primary-400"
              } `}
            >
              {isSubmitted ? "Submitted" : "Not Submitted"}
            </div>
          </div>
          <div className="text-h3 md:text-h2 font-koulen text-primaryDark-400 py-3 leading-[50px]">
            {judulTugas.toUpperCase()}
          </div>
          <div className="md:hidden flex flex-col w-fit items-end gap-0">
            <div className="text-h5 md:text-h4 font-hammersmith">
              Day {dayTugas}
            </div>
            <div
              className={`font-sen text-sub-2 py-1 px-4 border-[3px] rounded-xl font-bold whitespace-nowrap ${
                isSubmitted
                  ? "text-success-200 border-success-200"
                  : "text-primary-400 border-primary-400"
              } `}
            >
              {isSubmitted ? "Submitted" : "Not Submitted"}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row text-body-2 md:text-body-1 font-sen text-black font-bold md:font-normal gap-1 md:gap-5">
          <div>Start : {formatDate(startDate)} WIB</div>
          <div>End : {formatDate(endDate)} WIB</div>
        </div>

        <div className="font-sen text-h6 md:text-h5 text-black font-bold pt-5 md:pt-8">
          Description
        </div>
        <div className="text-body-2 md:text-body-1 font-sen text-black text-justify">
          {deskripsi}
        </div>

        <div className="font-sen text-h6 md:text-h5 text-black font-bold pt-5 md:pt-8">
          Attachment
        </div>
        <AttachmentList attachmentProps={attachment} />

        <div className="font-sen text-h6 md:text-h5 text-black font-bold pt-5 md:pt-8">
          Submission
        </div>
        <div>submisi</div>

        <div className="flex flex-row py-5 w-full justify-end font-sen gap-5">
          <div className="w-[150px]">
            <Button isPrimary={false} text="Cancel" type="button" />
          </div>
          <div className="w-[150px]">
            <Button isPrimary={true} text="Submit" type="button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
