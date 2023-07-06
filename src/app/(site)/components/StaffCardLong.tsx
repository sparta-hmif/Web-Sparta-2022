import Image from "next/image";

// Asset imports
import StaffBackground from "@/../public/images/landing/card-staff-bg.svg";
import DivisiBackground from "@/../public/images/landing/card-jabatan-bg.svg";
import Separator from "@/../public/images/landing/separator.svg";

// Component imports
import StaffCardShort, { StaffShortProps } from "./StaffCardShort";
import { StaffModalProps } from "./StaffModal";

export type StaffLongProps = {
  ketua: StaffShortProps;
  wakil1: StaffShortProps;
  wakil2?: StaffShortProps;
  staff: {
    namaPendek: string;
    nim: string;
  }[];
  cardFlow?: number;
};

export default function StaffCardLong({
  ketua,
  wakil1,
  wakil2,
  staff,
  cardFlow = 1,
  handleOpen,
}: StaffLongProps & {
  handleOpen: (props: StaffModalProps) => void;
}): JSX.Element {
  const isMobile = window.innerWidth < 640;

  return (
    <div className="flex mt-3 mb-2">
      <StaffCardShort {...ketua} />
      <div className="relative w-[73.6vw] h-auto aspect-[446/493] -mt-2 -mx-3 flex flex-col items-center sm:-mx-1.5 sm:-mt-1.5 sm:w-[24vw] md:-mx-2.5 md:-mt-2 lg:-mx-3">
        <div className="top-0 left-0 w-[73.6vw] h-auto aspect-[446/493] absolute sm:w-[24vw]">
          <Image src={StaffBackground} fill={true} alt="" priority={true} />
        </div>

        <h5 className="uppercase text-secondaryDark-400 w-full text-center font-bold mt-9 z-10 sm:text-xs sm:mt-6 md:mt-7 lg:text-lg">
          Staff
        </h5>
        <div className="relative w-[42%] h-auto aspect-[190/30] flex items-center xl:mt-1">
          <div className="absolute left-0 top-0 w-full h-auto aspect-[190/30]">
            <Image src={DivisiBackground} fill={true} alt="" priority={true} />
          </div>
          <p className="z-10 sub-1 text-primary-400 w-full text-center text-[10px] mt-0.5 sm:mt-0 sm:text-[8px] lg:mt-0 md:mt-0.5 lg:text-[10px] xl:text-xs">
            {ketua.divisi?.split("_").join(" ")}
          </p>
        </div>

        <div className="overflow-hidden flex flex-col mt-5 z-10 w-[65vw] flex-wrap h-auto aspect-[386/268] gap-x-[1vw] sm:w-[20vw] sm:mt-3 md:mt-4 lg:mt-7 xl:mt-11">
          {staff.map(({ namaPendek, nim }, idx) => (
            <button
              onClick={() =>
                handleOpen({
                  name: namaPendek,
                  nim,
                  divisi: ketua.divisi,
                  imageURL: "",
                  yunani: ketua.yunani,
                  isOpen: true,
                })
              }
              key={idx}
              style={{
                transform: `translateX(-${
                  cardFlow * (isMobile ? 65.5 : 21)
                }vw)`,
              }}
              className="w-[31.9vw] group sm:w-[9.5vw] sm:min-w-0 transition-all duration-200 basis-1/4"
            >
              <p className="font-sen text-[10px] group-hover:text-primary-600 font-bold text-capitalize text-secondaryDark-400 sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-xs">
                {namaPendek}
              </p>
              <p className="font-sen text-[10px] group-hover:text-primary-600 text-secondaryDark-400 sm:text-[6px] md:text-[8px] lg:text-xs">
                {nim}
              </p>
            </button>
          ))}
        </div>
      </div>
      <StaffCardShort {...wakil1} flipped={true} />
      {wakil2 ? (
        <div className="relative">
          <div className="absolute -left-2 top-5 w-auto h-[73.8vw] bg-[linear-gradient(180deg,#FEDDB2_0%,#B08144_140%)] aspect-[23/343] z-20 sm:top-2.5 sm:h-[23.75vw] md:top-3 lg:top-4 xl:top-5">
            <Image src={Separator} fill={true} alt="" priority={true} />
          </div>
          <div className="-ml-1">
            <StaffCardShort {...wakil2} flipped={true} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
