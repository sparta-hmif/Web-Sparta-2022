"use client";

import Button from "@/components/Button";
import CareerCard from "./CareerCard";
import { useState } from "react";

const PathSelection = () => {
  const [choices, setChoices] = useState(0);
  return (
    <div>
      <div className="font-sen">
        <div className="font-bold text-[24px] mb-3">Pilihan Karir</div>
        <div className="text-[13px] md:text-[15px] mb-5">
          Kamu bisa memilih dua karir yang kamu minati. Jangan lewatkan
          kesempatan ini!
        </div>
      </div>

      <div className="flex gap-x-5 lg:flex-wrap lg:justify-center overflow-auto lg:overflow-visible mb-3">
        <CareerCard type="webdev" kuota={100} pendaftar={0} />
        <CareerCard
          type="mobiledev"
          kuota={100}
          pendaftar={100}
          onClick={() => setChoices(choices + 1)}
        />
        <CareerCard
          type="gamedev"
          kuota={100}
          pendaftar={0}
          onClick={() => setChoices(choices + 1)}
        />
        <CareerCard
          type="datascience"
          kuota={100}
          pendaftar={0}
          onClick={() => setChoices(choices + 1)}
        />
        <CareerCard
          type="uiux"
          kuota={100}
          pendaftar={0}
          onClick={() => setChoices(choices + 1)}
        />
      </div>

      <div className="flex justify-center text-center mb-5">
        <div className="w-[130px] h-[50px]">
          <Button isPrimary={true} text="Submit" type="submit" />
        </div>
      </div>
    </div>
  );
};

export default PathSelection;
