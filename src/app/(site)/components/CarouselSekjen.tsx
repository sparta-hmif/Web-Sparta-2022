"use client";

import Image from "next/image";
import { useState } from "react";

// Asset imports
import ArrowLeft from "@/../public/images/landing/arrow-left-yellow.svg";
import ArrowRight from "@/../public/images/landing/arrow-right-yellow.svg";

// Component imports
import StaffCardShort, { StaffShortProps } from "./StaffCardShort";
import StaffCardLong, { StaffLongProps } from "./StaffCardLong";
import StaffModal, { StaffModalProps } from "./StaffModal";

type CarouselSekjenProps = {
  kabid: StaffShortProps;
  sekretaris: StaffShortProps[];
  bendahara: StaffShortProps[];
  divisiList: StaffLongProps[];
  bidang: string;
};

export default function CarouselSekjen({
  kabid,
  sekretaris,
  bendahara,
  divisiList,
  bidang,
}: CarouselSekjenProps): JSX.Element {
  const isMobile = window.innerWidth < 640;

  // Component states
  const [carouselFlow, setCarouselFlow] = useState(0);
  const [cardFlow, setCardFlow] = useState(
    new Array<number>(divisiList.length + (isMobile ? 7 : 3)).fill(0)
  );
  const [mobileCardFlow, setMobileCardFlow] = useState(0);

  const [modalContent, setModalContent] = useState<StaffModalProps>({
    name: "",
    nim: "",
    imageURL: "",
    divisi: "",
    yunani: "",
    isOpen: false,
  });

  const maxCarouselFlow = divisiList.length + (isMobile ? 7 : 3);
  const maxCardFlow = [
    ...new Array(isMobile ? 7 : 3).fill(0),
    ...divisiList.map((divisi) => Math.floor(divisi.staff.length / 8)),
  ];
  const maxMobileFlow = [
    ...new Array(isMobile ? 7 : 3).fill(0),
    ...divisiList.map((divisi) => (divisi.wakil2 ? 3 : 2)),
  ];

  const handleClick = (direction: string) => {
    if (direction === "left" && carouselFlow > 0) {
      if (!isMobile) {
        if (cardFlow[carouselFlow] > 0) {
          setCardFlow((prev) =>
            prev.map((flow, idx) => (idx === carouselFlow ? flow - 1 : flow))
          );
        } else {
          setCarouselFlow(carouselFlow - 1);
        }
      } else {
        if (mobileCardFlow > 0) {
          if (cardFlow[carouselFlow] > 0 && mobileCardFlow < 2) {
            setCardFlow((prev) =>
              prev.map((flow, idx) => (idx === carouselFlow ? flow - 1 : flow))
            );
          } else {
            setMobileCardFlow(mobileCardFlow - 1);
          }
        } else {
          setMobileCardFlow(maxMobileFlow[carouselFlow - 1]);
          setCarouselFlow(carouselFlow - 1);
        }
      }
    } else if (direction === "right" && carouselFlow <= maxCarouselFlow - 1) {
      if (!isMobile) {
        if (cardFlow[carouselFlow] <= maxCardFlow[carouselFlow] - 1) {
          setCardFlow((prev) =>
            prev.map((flow, idx) => (idx === carouselFlow ? flow + 1 : flow))
          );
        } else if (carouselFlow < maxCarouselFlow - 1) {
          setCarouselFlow(carouselFlow + 1);
        }
      } else {
        if (mobileCardFlow <= maxMobileFlow[carouselFlow] - 1) {
          if (
            mobileCardFlow >= 1 &&
            cardFlow[carouselFlow] < maxCardFlow[carouselFlow]
          ) {
            setCardFlow((prev) =>
              prev.map((flow, idx) => (idx === carouselFlow ? flow + 1 : flow))
            );
          } else {
            setMobileCardFlow(mobileCardFlow + 1);
          }
        } else if (carouselFlow < maxCarouselFlow - 1) {
          setMobileCardFlow(0);
          setCarouselFlow(carouselFlow + 1);
        }
      }
    }
  };

  const handleOpenModal = ({
    name,
    nim,
    imageURL,
    divisi,
    yunani,
  }: StaffModalProps) => {
    setModalContent({
      name,
      nim,
      imageURL,
      divisi,
      yunani,
      isOpen: true,
    });
  };

  const handleCloseModal = () =>
    setModalContent({
      name: "",
      nim: "",
      imageURL: "",
      divisi: "",
      yunani: "",
      isOpen: false,
    });

  return (
    <>
      <StaffModal {...modalContent} handleClose={handleCloseModal} />
      <div className="flex overflow-hidden items-center justify-center px-10 relative">
        <button
          style={{ display: carouselFlow === 0 ? "none" : "flex" }}
          onClick={() => handleClick("left")}
          className="z-30 w-[6vw] min-w-[63px] max-w-[100px] h-auto aspect-square bg-white rounded-full flex items-center justify-center absolute left-4 lg:left-10"
        >
          <div className="w-[4.7vw] min-w-[42px] h-auto aspect-square relative max-w-[68px] max-h-[68px]">
            <Image src={ArrowLeft} fill={true} alt="" />
          </div>
        </button>

        <div className="w-[225vw] flex shrink-0 overflow-hidden gap-2 sm:w-[79vw]">
          <div
            style={{
              transform: isMobile
                ? `translateX(-${Math.max(
                    (carouselFlow - 1) * 227 +
                      Math.min(mobileCardFlow * 60, 172) +
                      141,
                    0
                  )}vw)`
                : `translateX(-${carouselFlow * 79.5}vw)`,
            }}
            className="flex items-center justify-center min-w-full py-5 transition-all duration-200"
          >
            <StaffCardShort {...kabid} bidang={bidang} />
          </div>

          {/* Sekretaris-Bendahara Mobile */}
          {sekretaris.map((sekre, idx) => (
            <div
              key={idx}
              style={{
                transform: `translateX(-${Math.max(
                  (carouselFlow - 1) * 227 +
                    Math.min(mobileCardFlow * 60, 172) +
                    141,
                  0
                )}vw)`,
              }}
              className="flex items-center justify-start min-w-full py-5 transition-all duration-200 sm:hidden"
            >
              <StaffCardShort {...sekre} bidang={bidang} />
            </div>
          ))}
          {bendahara.map((sekre, idx) => (
            <div
              key={idx}
              style={{
                transform: `translateX(-${Math.max(
                  (carouselFlow - 1) * 227 +
                    Math.min(mobileCardFlow * 60, 172) +
                    141,
                  0
                )}vw)`,
              }}
              className="flex items-center justify-start min-w-full py-5 transition-all duration-200 sm:hidden"
            >
              <StaffCardShort {...sekre} bidang={bidang} />
            </div>
          ))}

          {/* Sekretaris-Bendahara Desktop */}
          <div
            style={{
              transform: `translateX(-${carouselFlow * 79.5}vw)`,
            }}
            className="hidden items-center justify-start min-w-full transition-all py-5 duration-200 gap-6 sm:justify-center sm:flex md:gap-8 lg:gap-10 xl:gap-16"
          >
            <div className="order-2">
              <StaffCardShort {...sekretaris[0]} bidang={bidang} />
            </div>
            <div className="order-1 mt-4 rotate-[3deg]">
              <StaffCardShort {...sekretaris[1]} bidang={bidang} />
            </div>
            <div className="order-3 mt-10 rotate-[-3deg]">
              <StaffCardShort {...sekretaris[2]} bidang={bidang} />
            </div>
          </div>
          <div
            style={{
              transform: `translateX(-${carouselFlow * 79.5}vw)`,
            }}
            className="hidden items-center justify-start min-w-full transition-all py-5 duration-200 gap-6 sm:justify-center sm:flex md:gap-8 lg:gap-10 xl:gap-16"
          >
            <div className="order-2">
              <StaffCardShort {...bendahara[0]} bidang={bidang} />
            </div>
            <div className="order-1 mt-4 rotate-[3deg]">
              <StaffCardShort {...bendahara[1]} bidang={bidang} />
            </div>
            <div className="order-3 mt-10 rotate-[-3deg]">
              <StaffCardShort {...bendahara[2]} bidang={bidang} />
            </div>
          </div>

          {/* Divis MSDM Panitia */}
          {divisiList.map((divisi, idx) => (
            <div
              key={idx}
              style={{
                transform: isMobile
                  ? `translateX(-${Math.max(
                      (carouselFlow - 1) * 227 +
                        Math.min(mobileCardFlow * 60, 172) +
                        141,
                      0
                    )}vw)`
                  : `translateX(-${carouselFlow * 79.5}vw)`,
              }}
              className="flex items-center justify-start min-w-full transition-all py-5 duration-200 sm:justify-center"
            >
              <StaffCardLong
                handleOpen={handleOpenModal}
                {...divisi}
                cardFlow={cardFlow[cardFlow.length - 1]}
              />
            </div>
          ))}
        </div>
        <button
          style={{
            display: !isMobile
              ? carouselFlow === maxCarouselFlow - 1 &&
                cardFlow[carouselFlow] === maxCardFlow[carouselFlow]
                ? "none"
                : "flex"
              : carouselFlow === maxCarouselFlow - 1 &&
                mobileCardFlow === maxMobileFlow[carouselFlow]
              ? "none"
              : "flex",
          }}
          onClick={() => handleClick("right")}
          className="z-30 w-[6vw] min-w-[63px] max-w-[100px] h-auto aspect-square bg-white rounded-full flex items-center justify-center absolute right-4 lg:right-10"
        >
          <div className="w-[4.7vw] min-w-[42px] h-auto aspect-square relative max-w-[68px] max-h-[68px]">
            <Image src={ArrowRight} fill={true} alt="" />
          </div>
        </button>
      </div>
    </>
  );
}
