"use client";
import Image from "next/image";
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
            {isReadMore ? "...(Read More)" : " (Show Less)"}
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
  accepted = false,
}: {
  nama: string;
  nim: string;
  alasan: string;
  photoUrl: string;
  accepted?: boolean;
}) => {
  return (
    <>
      <div className="py-2 px-3 lg:py-7 lg:px-7 w-full rounded-[15px] border-2 border-primaryDark-400 mb-2 lg:mb-4">
        <div className="flex justify-between mb-2 lg:mb-7">
          <div className="flex items-center flex-1 ">
            <div className="w-1/4 aspect-square lg:w-[110px] lg:h-[110px] rounded-full shrink-0 overflow-hidden">
              <Image
                src={photoUrl || "/images/landing/sparta.png"}
                alt="Photo"
                height={200}
                width={200}
                className="rounded-full object-cover object-center"
              />
            </div>
            <div className="w-8/12 ml-2 lg:ml-7">
              <h4 className="text-base md:text-3xl truncate">{nama}</h4>
              <h5 className="text-primaryDark-400 text-sm md:text-xl font-bold">
                {nim}
              </h5>
            </div>
          </div>
          <div className="w-1/4 max-w-[10rem] flex items-center">
            <button
              className={`w-full py-2 md:py-3 ${
                accepted ? "bg-danger-300" : "bg-secondary-400 "
              } transition font-sen text-white font-bold text-sm md:text-base rounded-lg md:rounded-xl hover:drop-shadow-[0_3px_6px_rgba(188,83,23,0.55)]`}
              onClick={() => {}}
            >
              {accepted ? "Batalkan" : "Terima"}
            </button>
          </div>
        </div>
        <p className="sub-1 text-base md:text-xl lg:mb-2">Alasan</p>
        <p className="body-1 text-sm md:text-lg text-justify">
          <ReadMore>{alasan}</ReadMore>
        </p>
      </div>
    </>
  );
};

export default DesuhCard;
