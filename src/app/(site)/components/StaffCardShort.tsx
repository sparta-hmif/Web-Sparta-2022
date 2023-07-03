import Image from "next/image";
import clsx from "clsx";

// Asset imports
import CardBackground from "@/../public/images/landing/staff-card-bg.svg";
import SpartaLogo from "@/../public/images/landing/sparta.png";
import CardLine from "@/../public/images/landing/card-line.svg";
import JabatanBackground from "@/../public/images/landing/card-jabatan-bg.svg";

export type StaffShortProps = {
  divisi: string;
  yunani: string;
  imageURL?: string;
  jabatan: string;
  namaPendek: string;
  nim: string;
  flipped?: boolean;
  bidang?: string;
};

const jabatanMap = new Map<string, string>([
  ["KADIV", "Ketua Divisi"],
  ["WAKADIV", "Wakil Ketua Divisi"],
  ["KABID", "Ketua Bidang"],
]);

export default function StaffCardShort({
  divisi,
  yunani,
  imageURL,
  jabatan,
  namaPendek,
  nim,
  flipped,
  bidang,
}: StaffShortProps): JSX.Element {
  return (
    <div className="z-10 relative w-[52.2vw] h-auto aspect-[319/484] min-w-[192px] min-h-[292px] max-w-[197px] max-h-[294px] flex flex-col items-center drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)] md:w-[16.7vw] lg:max-w-[319px] lg:max-h-[484px]">
      <div
        className={clsx(
          "-z-10 w-[52.2vw] h-auto aspect-[319/484] absolute left-0 top-0 min-w-[192px] min-h-[292px] max-w-[197px] max-h-[294px] md:w-[16.7vw] lg:max-w-[319px] lg:max-h-[484px]",
          flipped ? "-scale-x-100" : ""
        )}
      >
        <Image src={CardBackground} fill={true} alt="" priority={true} />
      </div>

      <h5 className="uppercase text-secondaryDark-400 font-bold w-full text-center mt-7 text-lg md:text-xl lg:mt-6 lg:text-lg xl:mt-[34px]">
        {divisi?.split("_").join(" ") ?? bidang}
      </h5>
      <p className="sub-1 w-full text-center text-secondaryDark-400 font-bold uppercase text-[10px] -mt-1 lg:text-xs lg:mt-0">
        {yunani ?? "Poseidon"}
      </p>

      <div className="mt-1 w-[32.7vw] h-auto aspect-square overflow-hidden rounded-full relative min-w-[118px] min-h-[118px] max-w-[120px] md:w-[9.5vw] lg:max-w-[200px] lg:max-h-[200px] lg:mt-1.5 xl:mt-2.5">
        <Image
          src={imageURL || SpartaLogo}
          fill={true}
          alt=""
          priority={true}
        />
      </div>

      <div className="w-[90%] mt-0.5 h-auto min-h-[26px] aspect-[298/26] relative xl:mt-1.5">
        <Image src={CardLine} fill={true} alt="" priority={true} />
      </div>

      <div className="relative w-[65%] h-auto aspect-[190/30] mt-1 flex items-center xl:mt-2">
        <div className="-z-10 absolute left-0 top-0 w-full h-auto aspect-[190/30]">
          <Image src={JabatanBackground} fill={true} alt="" priority={true} />
        </div>
        <p className="sub-1 text-primary-400 w-full text-center text-[10px] mt-0.5 md:text-xs lg:mt-0 lg:text-[10px] xl:text-xs">
          {jabatanMap.get(jabatan)}
        </p>
      </div>

      <p className="w-full text-center text-secondaryDark-400 mt-0.5 font-bold text-sm md:text-base lg:mt-2 lg:text-xs xl:text-sm">
        {namaPendek}
      </p>
      <p className="w-full text-center text-secondaryDark-400 text-xs xl:mt-1">
        {nim}
      </p>
    </div>
  );
}
