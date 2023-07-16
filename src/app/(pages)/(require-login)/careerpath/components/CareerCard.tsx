"use client";

import Button from "@/components/Button";
import Image from "next/image";

const CareerIcon = ({ type }: { type: string }) => {
  const getImage = () => {
    switch (type) {
      case "webdev":
        return (
          <Image
            alt="Web Development Icon"
            src={"images/careerpath/WebDevIcon.svg"}
            width={82}
            height={82}
            className="scale-[0.85] lg:scale-[0.9]"
          />
        );
      case "datascience":
        return (
          <Image
            alt="Data Science Icon"
            src={"images/careerpath/DataSciIcon.svg"}
            width={82}
            height={82}
            className="scale-75"
          />
        );
      case "gamedev":
        return (
          <Image
            alt="Game Development Icon"
            src={"images/careerpath/GameDevIcon.svg"}
            width={82}
            height={82}
            className="scale-90"
          />
        );
      case "mobiledev":
        return (
          <Image
            alt="Mobile Development Icon"
            src={"images/careerpath/MobileDevIcon.svg"}
            width={82}
            height={82}
            className="scale-[0.55]"
          />
        );
      case "uiux":
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
  type,
  kuota,
  pendaftar,
  isDisabled,
  onClick,
}: {
  type: string;
  kuota: number;
  pendaftar: number;
  isDisabled?: boolean;
  onClick?: () => void;
}) => {
  const getName = (type: string) => {
    switch (type) {
      case "webdev":
        return "Web Dev";
      case "mobiledev":
        return "Mobile Dev";
      case "gamedev":
        return "Game Dev";
      case "datascience":
        return "Data Science";
      case "uiux":
        return "UI UX";
    }
  };
  let baseClassName =
    "flex flex-col border-2 rounded-xl border-primaryDark-400 mb-3";
  let disabledClass =
    " opacity-80 cursor-not-allowed pointer-events-none bg-gray-400";
  if (isDisabled || kuota == pendaftar) {
    baseClassName += disabledClass;
  }
  return (
    <div className={baseClassName}>
      <div className="m-3 mb-4">
        <CareerIcon type={type} />
        <p className="text-center mb-2 mt-3 font-sen font-bold text-[20px]">
          {getName(type)}
        </p>
        <div className="flex flex-col justify-center items-center mb-4 font-sen text-[16px]">
          <p>Kuota: {kuota}</p>
          <p>Pendaftar: {pendaftar}</p>
        </div>
        <div className="mx-2">
          <Button
            isPrimary={true}
            text="Pilih"
            type="button"
            onClick={() => console.log("CLICKED!")}
          />
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
