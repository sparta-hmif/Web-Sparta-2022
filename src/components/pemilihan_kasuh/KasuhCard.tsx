import Button from "../Button";
import { dataProp } from "./PemilihanKasuh";

const KasuhCard = ({ nim, name, pendaftar, kuota, image }: dataProp) => {
  return (
    <>
      <div className=" px-[11px] py-[7px] lg:px-[29px] lg:py-[27px] border-primaryDark-500 border flex rounded-2xl justify-between items-center mt-[20px] mb-[20px]">
        <div className="flex items-center">
          {image != null ? (
            <div className=" bg-primaryDark-500 rounded-full h-10 w-10 md:h-14 md:w-14 lg:min-h-[110px] lg:min-w-[110px]"></div>
          ) : (
            <img src="" alt="" />
          )}

          <div className=" flex flex-col ml-[7px] md:ml-5 lg:ml-[40px]">
            <p className=" font-hammersmith text-sm md:text-2xl lg:text-[32px]">
              {name}
            </p>
            <p className=" text-primaryDark-400 text-xs md:text-lg lg:text-2xl font-sen font-bold">
              {nim}
            </p>
            <p className="  text-[8px] md:text-sm lg:text-base font-sen font-bold">
              Pendaftar : {pendaftar}
            </p>
            <p className="  text-[8px] md:text-sm lg:text-base font-sen font-bold">
              Kuota : {kuota}
            </p>
          </div>
        </div>
        <div className=" w-[60px] md:w-[146px] ">
          <Button isPrimary={true} text="Daftar" />
        </div>
      </div>
    </>
  );
};

export default KasuhCard;
