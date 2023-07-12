"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ViewKasuh = () => {
  const pathName = usePathname();
  return (
    <div className="w-full bg-primaryDark-400">
      <div className="w-full py-2 max-w-[60rem] flex relative mx-auto">
        <div
          className={`w-1/2 h-1 rounded-t-sm bg-primary-400 absolute bottom-0 ${
            pathName === "/desuh/election" && "translate-x-full"
          } duration-300 ease-in-out`}
        ></div>
        <Link href="/desuh/edit" className="w-1/2">
          <div className="w-full flex flex-col justify-around items-center cursor-pointer">
            <p className="font-koulen text-[16px] md:text-[24px] text-primary-400">
              Edit Informasi
            </p>
          </div>
        </Link>
        <Link href="/desuh/election" className="w-1/2">
          <div className="w-full flex flex-col justify-center items-center cursor-pointer">
            <p className="font-koulen text-[16px] md:text-[24px] text-primary-400">
              Pemilihan Desuh
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ViewKasuh;
