import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";

// Asset imports
import MobileBackground from "@/../public/images/landing/mobile-popup-bg.svg";
import DesktopBackground from "@/../public/images/landing/desktop-popup-bg.svg";
import SpartansImage from "@/../public/images/landing/sparta.png";

import { yunaniMap } from "./StaffCardShort";

export interface StaffModalProps {
  name: string;
  nim: string;
  imageURL: string;
  divisi: string;
  isOpen: boolean;
}

const StaffModal = ({
  name,
  nim,
  imageURL,
  divisi,
  isOpen,
  handleClose,
}: StaffModalProps & { handleClose: () => void }) => {
  const [fullScale, setFullScale] = useState(false);
  setTimeout(() => (isOpen ? setFullScale(true) : null), 50);

  return (
    <div
      style={{ display: isOpen ? "block" : "none" }}
      className="h-[100vh] w-[100vw] fixed top-0 left-0 z-[70]"
    >
      <div className="flex items-center justify-center z-[70] h-full w-full relative">
        <button
          onClick={() => {
            setFullScale(false);
            handleClose();
          }}
          className="inset-0 z-[60] bg-neutral-800/40 block absolute left-0 top-0 w-full h-full"
        />

        <div
          style={{
            transform: fullScale ? "scale(1)" : "scale(0.8)",
          }}
          className="h-auto aspect-[295/524] w-[81.9vw] flex relative flex-col duration-500 transition-transform sm:w-[50.3vw] sm:aspect-[725/416] z-[70] sm:flex-row"
        >
          <div className="absolute left-0 top-0 h-auto w-[81.9vw] aspect-[295/524] sm:hidden">
            <Image src={MobileBackground} fill={true} alt="" priority={true} />
          </div>
          <div className="hidden absolute left-0 top-0 h-auto w-[50.3vw] aspect-[725/416] sm:block">
            <Image src={DesktopBackground} fill={true} alt="" priority={true} />
          </div>

          <button
            onClick={() => {
              setFullScale(false);
              handleClose();
            }}
            className="z-[70]"
          >
            <IoClose
              className="absolute text-primary-400 right-3 top-3 cursor-pointer"
              size={30}
            />
          </button>

          <div className="z-10 w-full flex flex-col items-center sm:w-[24vw] sm:ml-[0.8vw]">
            <h1 className="uppercase text-primary-400 text-h5 font-bold font-sen mt-2 sm:mt-1 sm:text-xs lg:text-xl lg:mt-2">
              Staff
            </h1>
            <div className="z-10 h-auto w-[43vw] aspect-square rounded-full mt-7 bg-primaryDark-400 overflow-hidden relative sm:w-[17.7vw] sm:mt-6 md:mt-10">
              <Image
                src={imageURL || SpartansImage}
                fill={true}
                alt="Profile picture"
                priority={true}
              />
            </div>
          </div>

          <div className="flex px-5 flex-col z-10 mt-20 sm:mt-[53px] sm:ml-[20px] sm:px-0 md:ml-[30px] md:mt-[68px] lg:ml-[50px] lg:mt-[78px] xl:ml-[60px] xl:mt-[98px]">
            <p className="font-sen text-secondaryDark-400 uppercase font-bold w-full text-center text-3xl tracking-tight sm:text-left sm:text-xl lg:text-2xl xl:text-3xl">
              {divisi?.split("_").join(" ")}
            </p>
            <p className="font-sen text-secondaryDark-400 uppercase w-full text-center text-xl tracking-tight sm:text-left sm:text-base md:text-base lg:text-xl xl:text-2xl">
              {divisi ? yunaniMap.get(divisi.toUpperCase()) : ""}
            </p>
            <p className="font-sen font-bold capitalize text-primaryDark-400 w-full text-center text-lg mt-[50px] sm:mt-4 sm:text-left sm:text-sm lg:text-xl lg:mt-8 xl:mt-16 xl:text-2xl">
              {name}
            </p>
            <p className="font-sen text-primaryDark-400 text-sm w-full text-center sm:text-[10px] sm:text-left lg:text-lg xl:text-xl">
              {nim}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
