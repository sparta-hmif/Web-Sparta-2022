"use client";

// Asset imports
import ArrowLeft from "@/../public/images/landing/arrow-left-yellow.svg";
import ArrowRight from "@/../public/images/landing/arrow-right-yellow.svg";

// Component imports
import StaffCardShort, { StaffShortProps } from "./StaffCardShort";
import StaffCardLong, { StaffLongProps } from "./StaffCardLong";
import Image from "next/image";
import { useState } from "react";

type CarouselProps = {
  kabid: StaffShortProps;
  divisiList: StaffLongProps[];
};

export default function Carousel({
  kabid,
  divisiList,
}: CarouselProps): JSX.Element {
  const [carouselFlow, setCarouselFlow] = useState(0);

  const maxCardFlow = [
    0,
    ...divisiList.map((divisi) => Math.floor(divisi.staff.length / 8)),
  ];
  const [cardFlow, setCardFlow] = useState(
    new Array<number>(divisiList.length + 1).fill(0)
  );

  const handleClick = (direction: string) => {
    const maxCarouselFlow = divisiList.length + 1;

    if (direction === "left" && carouselFlow > 0) {
      if (cardFlow[carouselFlow] > 0) {
        setCardFlow((prev) =>
          prev.map((flow, idx) => (idx === carouselFlow ? flow - 1 : flow))
        );
      } else {
        setCarouselFlow(carouselFlow - 1);
      }
    } else if (direction === "right" && carouselFlow < maxCarouselFlow - 1) {
      if (cardFlow[carouselFlow] <= maxCardFlow[carouselFlow] - 1) {
        setCardFlow((prev) =>
          prev.map((flow, idx) => (idx === carouselFlow ? flow + 1 : flow))
        );
      } else {
        setCarouselFlow(carouselFlow + 1);
      }
    }
  };

  return (
    <div className="flex items-center justify-between px-10 relative">
      <button
        onClick={() => handleClick("left")}
        className="z-40 w-[7vw] min-w-[63px] max-w-[100px] left-4 h-auto aspect-square bg-white rounded-full flex items-center justify-center"
      >
        <div className="w-[4.7vw] h-auto aspect-square relative max-w-[68px] max-h-[68px]">
          <Image src={ArrowLeft} fill={true} alt="" />
        </div>
      </button>
      <div className="w-[79vw] flex shrink-0 overflow-hidden gap-2">
        <div
          style={{ transform: `translateX(-${carouselFlow * 79.5}vw)` }}
          className="flex items-center justify-center min-w-full transition-all duration-200"
        >
          <StaffCardShort {...kabid} />
        </div>
        {divisiList.map((divisi, idx) => (
          <div
            key={idx}
            style={{ transform: `translateX(-${carouselFlow * 79.5}vw)` }}
            className="flex items-center justify-center min-w-full transition-all duration-200"
          >
            <StaffCardLong {...divisi} cardFlow={cardFlow[idx + 1]} />
          </div>
        ))}
      </div>
      <button
        onClick={() => handleClick("right")}
        className="z-40 w-[7vw] min-w-[63px] max-w-[100px] h-auto aspect-square right-4 bg-white rounded-full flex items-center justify-center"
      >
        <div className="w-[4.7vw] h-auto aspect-square relative max-w-[68px] max-h-[68px]">
          <Image src={ArrowRight} fill={true} alt="" />
        </div>
      </button>
    </div>
  );
}
