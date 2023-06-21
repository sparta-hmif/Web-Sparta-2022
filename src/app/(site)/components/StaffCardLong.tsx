import Image from "next/image";

// Asset imports
import StaffBackground from "@/../public/images/landing/card-staff-bg.svg";
import DivisiBackground from "@/../public/images/landing/card-jabatan-bg.svg";

// Component imports
import StaffCardShort, { StaffShortProps } from "./StaffCardShort";
import clsx from "clsx";

export type StaffLongProps = {
  ketua: StaffShortProps;
  wakil: StaffShortProps;
  staff: {
    namaLengkap: string;
    nim: string;
  }[];
  cardFlow?: number;
};

export default function StaffCardLong({
  ketua,
  wakil,
  staff,
  cardFlow = 1,
}: StaffLongProps): JSX.Element {
  return (
    <div className="flex mt-3 mb-5">
      <StaffCardShort {...ketua} />
      <div className="relative w-[32.2vw] h-auto aspect-[446/493] -mt-3 -mx-3 flex flex-col items-center">
        <div className="top-0 left-0 w-[32.2vw] h-auto aspect-[446/493] absolute">
          <Image src={StaffBackground} fill={true} alt="" />
        </div>

        <h5 className="uppercase text-secondaryDark-400 w-full text-center font-bold mt-9 z-10">
          Staff
        </h5>
        <div className="relative w-[42%] h-auto aspect-[190/30] flex items-center xl:mt-1">
          <div className="absolute left-0 top-0 w-full h-auto aspect-[190/30]">
            <Image src={DivisiBackground} fill={true} alt="" />
          </div>
          <p className="z-10 sub-1 text-primary-400 w-full text-center text-[10px] mt-0.5 md:text-xs lg:mt-0 lg:text-sub-1">
            {ketua.divisi}
          </p>
        </div>

        <div className="overflow-hidden flex flex-col mt-11 z-10 w-[27vw] flex-wrap h-auto aspect-[386/268] gap-x-[1vw]">
          {staff.map(({ namaLengkap, nim }, idx) => (
            <div
              key={idx}
              style={{ transform: `translateX(-${cardFlow * 28}vw` }}
              className="w-[13vw] transition-all duration-200 basis-1/4"
            >
              <p className="font-sen font-bold text-capitalize text-secondaryDark-400 text-lg">
                {namaLengkap}
              </p>
              <p className="font-sen text-sm text-secondaryDark-400">{nim}</p>
            </div>
          ))}
        </div>
      </div>
      <StaffCardShort {...wakil} flipped={true} />
    </div>
  );
}
