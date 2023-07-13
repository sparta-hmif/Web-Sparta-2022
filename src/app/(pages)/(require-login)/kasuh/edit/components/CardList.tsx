"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import Card from "./Card";

export interface KasuhProps {
  rank: number;
  nama: string;
  nim: string;
  kuota: number;
  image: string;
}

const CardList = ({ pilihanKasuh }: { pilihanKasuh: KasuhProps[] }) => {
  const [pilihan, setPilihan] = useState(pilihanKasuh); // [{id: 1, nama: "Nama Kakak 1", nim: "13518201"}, {id: 2, nama: "Nama Kakak 2", nim: "13518202"}, {id: 3, nama: "Nama Kakak 3", nim: "13518203"}

  const isChanged = useMemo(() => {
    return pilihan.some((pil, index) => pil.rank !== index + 1);
  }, [pilihan]);

  const handleUp = (rank: number) => {
    if (rank === 1) return;
    const newPilihan = [...pilihan];
    const rankingIndex = newPilihan.findIndex((pil) => pil.rank === rank);
    const rankingPrevIndex = newPilihan.findIndex(
      (pil) => pil.rank === rank - 1
    );
    newPilihan[rankingIndex].rank = rank - 1;
    newPilihan[rankingPrevIndex].rank = rank;
    setPilihan(newPilihan);
  };
  const handleDown = (rank: number) => {
    if (rank === 3) return;
    const newPilihan = [...pilihan];
    const rankingIndex = newPilihan.findIndex((pil) => pil.rank === rank);
    const rankingNextIndex = newPilihan.findIndex(
      (pil) => pil.rank === rank + 1
    );
    newPilihan[rankingIndex].rank = rank + 1;
    newPilihan[rankingNextIndex].rank = rank;
    setPilihan(newPilihan);
  };

  const handleSave = () => {
    //Ngesave nya diurutin dulu berdasarkan rank yang udah diubah
    const sortedPilihan = [...pilihan].sort((a, b) => a.rank - b.rank);
    setPilihan(sortedPilihan);
  };

  const handleCancel = () => {
    const initialPilihan = pilihan.map((pil, index) => {
      return { ...pil, rank: index + 1 };
    });
    setPilihan(initialPilihan);
  };

  return (
    <>
      <div className="relative my-10 h-[25rem] md:h-[32rem]">
        {pilihan.map((pil) => (
          <Card
            key={pil.nim}
            rank={pil.rank}
            name={pil.nama}
            nim={pil.nim}
            kuota={pil.kuota}
            image={pil.image}
            handleUp={handleUp}
            handleDown={handleDown}
          />
        ))}
      </div>
      <div className="flex h-14 justify-end">
        <div className="w-10/12 gap-3 max-w-[30rem] flex">
          {isChanged && (
            <>
              <Button text="Cancel" isPrimary={false} onClick={handleCancel} />
              <Button text="Save" isPrimary onClick={handleSave} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CardList;
