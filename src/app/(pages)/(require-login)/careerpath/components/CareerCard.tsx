"use client";

import Button from "@/components/Button";
import Image from "next/image";

// Constants
const WEB_DEV_ID = "64b7aa5a6dad435a2ee716b4";
const MOBILE_DEV_ID = "64b89f31a759a38451333240";
const DATA_SCI_ID = "64bb9797ea5d6e248e6ef9f9";
const UI_UX_ID = "64bb97a4ea5d6e248e6ef9fa";
const GAME_DEV_ID = "64bb97b0ea5d6e248e6ef9fb";

const CareerIcon = ({ id }: { id: string }) => {
  const getImage = () => {
    switch (id) {
      case WEB_DEV_ID:
        return (
          <Image
            alt="Web Development Icon"
            src={"images/careerpath/WebDevIcon.svg"}
            width={82}
            height={82}
            className="scale-[0.85] lg:scale-[0.9]"
          />
        );
      case MOBILE_DEV_ID:
        return (
          <Image
            alt="Data Science Icon"
            src={"images/careerpath/DataSciIcon.svg"}
            width={82}
            height={82}
            className="scale-75"
          />
        );
      case DATA_SCI_ID:
        return (
          <Image
            alt="Game Development Icon"
            src={"images/careerpath/GameDevIcon.svg"}
            width={82}
            height={82}
            className="scale-90"
          />
        );
      case UI_UX_ID:
        return (
          <Image
            alt="Product Manager Icon"
            src={"images/careerpath/MobileDevIcon.svg"}
            width={82}
            height={82}
            className="scale-[0.55]"
          />
        );
      case GAME_DEV_ID:
        return (
          <Image
            alt="UI UX Icon"
            src={"images/careerpath/UIUXIcon.svg"}
            width={82}
            height={82}
            className=""
          />
        );
    }
  };
  return (
    <div className="bg-primaryDark-400 w-[150px] lg:w-[120px] lg:h-[100px]  h-[130px] rounded-[10px] flex justify-center items-center">
      {getImage()}
    </div>
  );
};

const CareerCard = ({
  id,
  name,
  kuota,
  pendaftar,
  isDisabled,
  onClick,
  onCancel,
  selected,
}: {
  id: string;
  name: string;
  kuota: number;
  pendaftar: number;
  isDisabled?: boolean;
  onClick: () => void;
  onCancel: () => void;
  selected: boolean;
}) => {
  return (
    <div
      className={`flex flex-col border-2 rounded-xl border-primaryDark-400 mb-3 ${
        isDisabled &&
        "opacity-80 cursor-not-allowed pointer-events-none bg-neutral-400"
      }`}
    >
      <div className="m-3 mb-4">
        <CareerIcon id={id} />
        <p className="text-center mb-2 mt-3 font-sen font-bold text-[20px]">
          {name}
        </p>
        <div className="flex flex-col justify-center items-center mb-4 font-sen text-[16px]">
          <p>Kuota: {kuota}</p>
          <p>Pendaftar: {pendaftar}</p>
        </div>
        <div className="mx-2">
          {selected ? (
            <Button
              isPrimary
              text="Batal"
              color="bg-danger-300"
              onClick={() => onCancel()}
            />
          ) : (
            <Button isPrimary text="Pilih" onClick={() => onClick()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
