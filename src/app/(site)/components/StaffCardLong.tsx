import Image from "next/image";

// Asset imports
import StaffBackground from "@/../public/images/landing/card-staff-bg.svg";
import DivisiBackground from "@/../public/images/landing/card-jabatan-bg.svg";
import Separator from "@/../public/images/landing/separator.svg";

// Component imports
import StaffCardShort, { StaffShortProps } from "./StaffCardShort";

export type StaffLongProps = {
  ketua: StaffShortProps;
  wakil: StaffShortProps;
  wakil_2?: StaffShortProps;
  staff: {
    namaLengkap: string;
    nim: string;
  }[];
  cardFlow?: number;
};

export default function StaffCardLong({
  ketua,
  wakil,
  wakil_2,
  staff,
  cardFlow = 1,
}: StaffLongProps): JSX.Element {
  return (
    <div className="flex mt-3 mb-2">
      <StaffCardShort {...ketua} />
      <div className="relative w-[24vw] h-auto aspect-[446/493] min-w-[276px] min-h-[312px] max-w-[463px] max-h-[512px] -mt-2 -mx-3 flex flex-col items-center lg:-mt-2 xl:-mt-1">
        <div className="top-0 left-0 w-[24vw] h-auto aspect-[446/493] min-w-[276px] min-h-[312px] max-w-[463px] max-h-[512px] absolute">
          <Image src={StaffBackground} fill={true} alt="" />
        </div>

        <h5 className="uppercase text-secondaryDark-400 w-full text-center font-bold mt-9 z-10 lg:text-lg">
          Staff
        </h5>
        <div className="relative w-[42%] h-auto aspect-[190/30] flex items-center xl:mt-1">
          <div className="absolute left-0 top-0 w-full h-auto aspect-[190/30]">
            <Image src={DivisiBackground} fill={true} alt="" />
          </div>
          <p className="z-10 sub-1 text-primary-400 w-full text-center text-[10px] mt-0.5 md:text-xs lg:mt-0 lg:text-[10px] xl:text-xs">
            {ketua.divisi}
          </p>
        </div>

        <div className="overflow-hidden min-w-[230px] flex flex-col mt-5 z-10 w-[20vw] flex-wrap h-auto aspect-[386/268] gap-x-[1vw] lg:mt-9 xl:mt-11">
          {staff.map(({ namaLengkap, nim }, idx) => (
            <div
              key={idx}
              style={{
                transform: `translateX(-${
                  cardFlow * Math.max(0.21 * window.innerWidth, 230)
                }px`,
              }}
              className="w-[9.5vw] min-w-[115px] transition-all duration-200 basis-1/4"
            >
              <p className="font-sen text-[10px] font-bold text-capitalize text-secondaryDark-400 lg:text-xs xl:text-sm">
                {namaLengkap}
              </p>
              <p className="font-sen text-[10px] text-secondaryDark-400 lg:text-sm">
                {nim}
              </p>
            </div>
          ))}
        </div>
      </div>
      <StaffCardShort {...wakil} flipped={true} />
      {wakil_2 ? (
        <div className="relative">
          <div className="absolute -left-2 top-5 w-auto h-[73.8vw] min-h-[270px] bg-[linear-gradient(180deg,#FEDDB2_0%,#B08144_140%)] aspect-[23/343] z-20 max-h-[274px] lg:max-h-[1000px] lg:h-[23.75vw]">
            <Image src={Separator} fill={true} alt="" />
          </div>
          <div className="-ml-1">
            <StaffCardShort {...wakil_2} flipped={true} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
