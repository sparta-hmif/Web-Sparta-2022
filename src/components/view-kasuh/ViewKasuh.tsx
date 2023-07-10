"use client"
import { useState } from "react";
import DashboardHeader from "../DashboardHeader";
import EditKasuh from "../edit-kasuh/EditKasuh";
import PemilihanDesuh from "../pemilihan-desuh/PemilihanDesuh";

const ViewKasuh = () => {
  const [indeks, setIndeks] = useState(0);
  return (
    <>
      <DashboardHeader title={"KAKAK ASUH"} />
      <div className="w-full h-16 bg-primaryDark-400 px-7 lg:px-[208px] flex">
        <div
          className="w-1/2 flex flex-col justify-around items-center cursor-pointer"
          onClick={() => setIndeks(0)}
        >
          <div className="w-full h-1"></div>
          <p className="font-koulen text-[16px] md:text-[24px] text-primary-400">
            Edit Informasi
          </p>
          <div className={`w-full h-1 bg-primary-400 ${indeks == 1 && "translate-x-full"} duration-300 ease-in-out`}></div>
        </div>
        <div
          className="w-1/2 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setIndeks(1)}
        >
          <p className="font-koulen text-[16px] md:text-[24px] text-primary-400">
            Pemilihan Desuh
          </p>
        </div>
      </div>
      {indeks == 0?<EditKasuh/> : <PemilihanDesuh/>}
    </>
  );
};

export default ViewKasuh;
