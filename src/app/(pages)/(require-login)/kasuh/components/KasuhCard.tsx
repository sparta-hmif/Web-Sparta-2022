import Button from "@/components/Button";
import { dataProp } from "./PemilihanKasuh";
import Image from "next/image";
import Link from "next/link";

const KasuhCard = ({ nim, name, kuota, image }: dataProp) => {
  return (
    <>
      <div className=" px-[11px] py-[7px] lg:px-[29px] lg:py-[27px] border-primaryDark-500 border flex rounded-2xl justify-between items-center mt-[20px] mb-[20px]">
        <div className="flex items-center">
          <div className=" rounded-full h-10 w-10 md:h-14 md:w-14 lg:min-h-[110px] lg:min-w-[110px] overflow-hidden">
            <Image
              src={image || "/images/landing/sparta.png"}
              alt="profile"
              width={1000}
              height={1000}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className=" flex flex-col ml-[7px] md:ml-5 lg:ml-[40px]">
            <p className=" font-hammersmith text-sm md:text-2xl lg:text-[32px]">
              {name}
            </p>
            <p className=" text-primaryDark-400 text-xs md:text-lg lg:text-2xl font-sen font-bold">
              {nim?.slice(5)}
            </p>
            <p className="  text-[8px] md:text-sm lg:text-base font-sen font-bold">
              Kuota : {kuota}
            </p>
          </div>
        </div>
        <Link href={`/kasuh/${nim}`}>
          <div className=" w-[60px] md:w-[146px] ">
            <Button isPrimary={true} text="Open" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default KasuhCard;
