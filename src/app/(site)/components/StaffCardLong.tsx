import Image from "next/image";

// Asset imports
import ArrowLeft from "@/../public/images/landing/arrow-left-yellow.svg";
import ArrowRight from "@/../public/images/landing/arrow-right-yellow.svg";
import StaffBackground from "@/../public/images/landing/card-staff-bg.svg";

// Component imports
import StaffCardShort, { StaffShortProps } from "./StaffCardShort";

type StaffLongProps = {
  ketua: StaffShortProps;
  wakil: StaffShortProps;
  staff: {
    namaLengkap: string;
    nim: string;
  }[];
};

export default function StaffCardLong({
  ketua,
  wakil,
  staff,
}: StaffLongProps): JSX.Element {
  return (
    <div className="flex">
      <StaffCardShort {...ketua} />
      <div className="relative w-[32.2vw] h-auto aspect-[446/493] -mt-3 -mx-3">
        <div className="top-0 left-0 w-[32.2vw] h-auto aspect-[446/493] relative -z-10">
          <Image src={StaffBackground} fill={true} alt="" />
        </div>
      </div>
      <StaffCardShort {...wakil} flipped={true} />
    </div>
  );
}
