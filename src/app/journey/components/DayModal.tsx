"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ContentElement from "./ContentElement";

const DayModal = ({
  day,
  date,
  content,
  onClose,
}: {
  day: number;
  date: string;
  content: {
    starReview: number;
    story: string;
    reflection: string;
  }
  onClose: () => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const StarElement = ({ order }: { order: number }) => {
    return (
      <FaStar
        size={20}
        className={`${
          contentValue.starReview >= order ? "text-primary-400" : "text-primaryLight-700"
        } cursor-pointer`}
        onClick={() => setContentValue((prev) => ({ ...prev, starReview: order }))}
      />
    );
  };

  const [viewMode, setViewMode] = useState(true);
  const [contentValue, setContentValue] = useState(content);
  return (
    <div className="fixed z-50 h-screen top-0 inset-x-0 bg-neutral-800/70 backdrop-blur-[2px]">
      <div className="w-full h-full relative flex justify-center items-center">
        <Image
          src="/images/journey/Bottom.svg"
          alt="Bottom"
          width={375}
          height={375}
          className="absolute w-full bottom-0"
          onClick={onClose}
        />
        <div className="w-11/12 h-[90vh] max-w-2xl bg-white border-4 border-primaryDark-400 z-10 rounded-2xl py-3 px-5 md:p-10 flex flex-col items-center">
          <div className="w-11/12 max-w-[20rem] flex items-center flex-col gap-3">
            <Image
              src="/images/journey/Awesome.svg"
              alt="Awesome"
              width={375}
              height={375}
              className="object-contain w-10/12"
            />
            <div className="w-full drop-shadow-lg rounded-2xl bg-white flex py-3 px-5 justify-center items-center gap-2">
              <StarElement order={1} />
              <StarElement order={2} />
              <StarElement order={3} />
              <StarElement order={4} />
              <StarElement order={5} />
              <h5 className="font-bold leading-none text-lg ml-2">
                {contentValue.starReview}
              </h5>
            </div>
          </div>
          <div className=" w-full flex flex-col h-[70%] lg:h-[65%] mt-4 mb-3">
            <h2 className="text-primaryDark-400 leading-none text-4xl md:text-6xl">
              DAY {day}
            </h2>
            <p className="body-1 text-xs md:text-sm mb-2">{date}</p>
            <div className="w-full h-[85%] lg:h-[75%] mt-auto flex-col gap-3 flex">
              <ContentElement
                title="What Spartan Did?"
                value={contentValue.story}
                onChange={handleChange}
                name="story"
                viewMode={viewMode}
              />
              <ContentElement
                title="Spartan's Reflection"
                value={contentValue.reflection}
                onChange={handleChange}
                name="reflection"
                viewMode={viewMode}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 gap-4 flex mt-auto">
            <Button text="Close" isPrimary={false} onClick={onClose} />
            {viewMode ? (
              <Button
                text="Edit"
                isPrimary={true}
                onClick={() => setViewMode(false)}
              />
            ) : (
              <Button
                text="Save"
                isPrimary={true}
                onClick={() => setViewMode(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
