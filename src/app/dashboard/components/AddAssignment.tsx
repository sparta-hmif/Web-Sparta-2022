"use client";

import { useRef, useState } from "react";
import Button from "../../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LinkAttachment, { AttachmentProps } from "@/components/LinkAttachment";

const AddAssignment = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // const [data, setData] = useState<string>();

  // const childToParent = (childData: string) => {
  //   setData(childData);
  // };

  const [attachment, setAttachment] = useState<Array<AttachmentProps>>([]);

  const addAttachment = (val: AttachmentProps) => {
    setAttachment([...attachment, val]);
  };

  const deleteAttachment = (idx: number) => {
    const temp = [...attachment];
    temp.splice(idx, 1);
    setAttachment(temp);
  };

  return (
    <>
      <div className="p-7 lg:px-64 lg:py-10">
        <h1 className="text-[40px] text-primaryDark-400 lg:text-[64px]">
          NEW ASSIGNMENT
        </h1>
        <form>
          <div className="flex flex-col">
            <label
              htmlFor="judul"
              className="sub-1 text-[14px] my-1 lg:text-[24px] lg:my-3"
            >
              Judul
            </label>
            <input
              type="text"
              id="judul"
              className="py-2 px-3 text-[8px] font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400 lg:text-[16px]"
              placeholder="Judul"
            />
          </div>
          <div className="flex gap-[10px] lg:gap-[22px]">
            <div className="flex flex-col w-1/5">
              <label
                htmlFor="Day"
                className="sub-1 text-[14px] my-1 lg:text-[24px] lg:my-3"
              >
                Day
              </label>
              <input
                type="text"
                id="Day"
                className="py-2 px-3 text-[8px] font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400 lg:text-[16px]"
                placeholder="Day"
              />
            </div>
            <div className="flex flex-col w-2/5">
              <label
                htmlFor="Start Date"
                className="sub-1 text-[14px] my-1 lg:text-[24px] lg:my-3"
              >
                Start
              </label>
              <div className="relative flex flex-col justify-center">
                <DatePicker
                  id="Start Date"
                  className="w-full py-2 px-3 text-[8px] font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400 lg:text-[16px]"
                  placeholderText="Start Date"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <div className="hidden absolute bg-[url('/calendar-day.svg')] w-[25px] h-[25px] right-[10px] lg:block"></div>
              </div>
            </div>
            <div className="flex flex-col w-2/5">
              <label
                htmlFor="End Date"
                className="sub-1 text-[14px] my-1 lg:text-[24px] lg:my-3"
              >
                End
              </label>
              <div className="relative flex flex-col justify-center">
                <DatePicker
                  id="End Date"
                  className="w-full py-2 px-3 text-[8px] font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400 lg:text-[16px]"
                  placeholderText="End Date"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
                <div className="hidden absolute bg-[url('/calendar-day.svg')] w-[25px] h-[25px] right-[10px] lg:block"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Description"
              className="sub-1 text-[14px] my-1 lg:text-[24px] lg:my-3"
            >
              Desc
            </label>
            <textarea
              id="Description"
              className="py-2 px-3 h-[100px] text-[8px] font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400 lg:text-[16px] lg:h-[234px]"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="attachment"
              className="sub-1 text-[14px] my-1 lg:text-[24px] lg:my-3"
            >
              Attachment
            </label>
            <div className="w-full">
              <LinkAttachment
                linkArray={attachment}
                addLink={addAttachment}
                deleteLink={deleteAttachment}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 my-7 lg:justify-end">
            <Button isPrimary={false} text={"Cancel"}></Button>
            <Button isPrimary={true} text={"Post"}></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAssignment;