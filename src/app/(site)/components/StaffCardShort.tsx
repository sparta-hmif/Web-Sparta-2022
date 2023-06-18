import Image from "next/image";

// Asset imports
import CardBackground from "@/../public/images/landing/staff-card-bg.svg";
import SpartaLogo from "@/../public/images/landing/sparta.png";
import CardLine from "@/../public/images/landing/card-line.svg";
import JabatanBackground from "@/../public/images/landing/card-jabatan-bg.svg";

type ComponentProps = {
  divisi: string;
  yunani: string;
  imageURL?: string;
  jabatan: string;
  namaLengkap: string;
  nim: string;
};

export default function StaffCardShort({
  divisi,
  yunani,
  imageURL,
  jabatan,
  namaLengkap,
  nim,
}: ComponentProps): JSX.Element {
  return (
    <div className="relative w-[52.2vw] h-auto aspect-[319/484] min-w-[188px] min-h-[292px] max-w-[319px] max-h-[484px] flex flex-col items-center md:w-[22.1vw]">
      <div className="-z-10 w-[52.2vw] h-auto aspect-[319/484] absolute left-0 top-0 min-w-[188px] min-h-[292px] max-w-[319px] max-h-[484px] md:w-[22.1vw]">
        <Image src={CardBackground} fill={true} alt="" />
      </div>

      <h5 className="uppercase text-secondaryDark-400 font-bold w-full text-center mt-7 text-lg md:text-xl lg:mt-11 lg:text-h5">
        {divisi}
      </h5>
      <p className="sub-1 w-full text-center text-secondaryDark-400 font-bold uppercase text-[10px] -mt-1 lg:text-sub-1 lg:mt-0">
        {yunani}
      </p>

      <div className="mt-1 w-[32.7vw] h-auto aspect-square overflow-hidden rounded-full relative min-w-[118px] min-h-[118px] max-w-[200px] max-h-[200px] md:w-[11.8vw] lg:mt-2.5 xl:mt-4">
        <Image src={imageURL || SpartaLogo} fill={true} alt="" />
      </div>

      <div className="w-[90%] mt-0.5 h-auto min-h-[26px] aspect-[298/26] relative xl:mt-2.5">
        <Image src={CardLine} fill={true} alt="" />
      </div>

      <div className="relative w-[65%] h-auto aspect-[190/30] mt-1 flex items-center xl:mt-3">
        <div className="-z-10 absolute left-0 top-0 w-full h-auto aspect-[190/30]">
          <Image src={JabatanBackground} fill={true} alt="" />
        </div>
        <p className="sub-1 text-primary-400 w-full text-center text-[10px] mt-0.5 md:text-xs lg:mt-0 lg:text-sub-1">
          {jabatan}
        </p>
      </div>

      <p className="w-full text-center text-secondaryDark-400 mt-0.5 font-bold text-sm md:text-base lg:mt-2.5 lg:text-xl">
        {namaLengkap}
      </p>
      <p className="w-full text-center text-secondaryDark-400 text-xs lg:text-sm xl:mt-2">
        {nim}
      </p>
    </div>
  );
}
