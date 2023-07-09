"use client";
import Button from "@/components/Button";
import React from "react";
import { useEffect, useState } from "react";

const ReadMore = ({ children }: { children: string }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <>
      {width != 0 && (
        <p>
          {isReadMore
            ? text.slice(
                0,
                width >= 1024 ? text.length : width >= 768 ? 900 : 180
              )
            : text}
          <span
            onClick={toggleReadMore}
            className={`${
              text.length ==
                text.slice(
                  0,
                  width > 1024 ? text.length : width > 767 ? 900 : 180
                ).length && "hidden"
            } cursor-pointer text-secondary-400`}
          >
            {isReadMore ? "...(read more)" : " (show less)"}
          </span>
        </p>
      )}
    </>
  );
};

const DesuhCard = ({
  nama,
  nim,
  alasan,
  photoUrl,
  disable = false,
  onClick,
}: {
  nama: string;
  nim: string;
  alasan: string;
  photoUrl: string;
  disable?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <div className="py-2 px-3 lg:py-7 lg:px-7 w-full rounded-[15px] border-2 border-primaryDark-400 mb-2 lg:mb-4">
        <div className="flex justify-between mb-2 lg:mb-5">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] lg:w-[110px] lg:h-[110px] rounded-full shrink-0 bg-primaryDark-400"></div>
            <div className="ml-2 lg:ml-10">
              <h4 className="text-[14px] lg:text-[36px]">{nama}</h4>
              <h5 className="text-primaryDark-400 text-[12px] lg:text-[24px] font-bold">
                {nim}
              </h5>
            </div>
          </div>
          <div className="w-16 lg:w-36">
            {disable ? (
              <button
                disabled
                className="w-full py-3 px-2 font-sen bg-secondaryDark-400 rounded-xl md:rounded-2xl font-bold text-white text-xs md:text-base"
              >
                Terima
              </button>
            ) : (
              <Button
                isPrimary={true}
                text={"Terima"}
                type="button"
                onClick={onClick}
              />
            )}
          </div>
        </div>
        <p className="sub-1 text-[8px] lg:text-[16px] lg:mb-2">Alasan</p>
        <p className="body-1 text-[8px] lg:text-[16px] text-justify">
          <ReadMore>{alasan}</ReadMore>
        </p>
      </div>
    </>
  );
};

export default DesuhCard;
