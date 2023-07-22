"use client";

import Button from "@/components/Button";
import CareerCard from "./CareerCard";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import { User } from "@prisma/client";

const career = [
  {
    id: 1,
    name: "Web Dev",
    kuota: 100,
    pendaftar: 0,
  },
  {
    id: 2,
    name: "Mobile Dev",
    kuota: 100,
    pendaftar: 0,
  },
  {
    id: 3,
    name: "Data Sci",
    kuota: 100,
    pendaftar: 0,
  },
  {
    id: 4,
    name: "UI/UX",
    kuota: 100,
    pendaftar: 0,
  },
  {
    id: 5,
    name: "Game Dev",
    kuota: 100,
    pendaftar: 0,
  },
];

// const selection = [1, 2];

const PathSelection = () => {
  const [choices, setChoices] = useState<string[]>([]);

  const session = useSession();

  const { data: careerList } = useSWR(
    process.env.NEXT_PUBLIC_WEB_URL + "/api/career-path",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const { data: userCareer } = useSWR(
    () =>
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/career-path/${
        (session?.data?.user as User).nim
      }`,
    fetcher
  );

  const selection: string[] = useMemo(
    () => userCareer?.CareerPath?.map((c: any) => c.id) || [],
    [userCareer]
  );

  const handleSelect = (id: string) => {
    if (choices.length >= 2) return;
    setChoices([...choices, id]);
  };

  const handleUnselect = (id: string) => {
    setChoices(choices.filter((choice) => choice !== id));
  };

  const isChanged = useMemo(() => {
    return (
      choices.sort().join(",") !== selection.sort().join(",") &&
      choices.length === 2
    );
  }, [choices, selection]);

  const isSame = useMemo(() => {
    return choices.sort().join(",") === selection.sort().join(",");
  }, [choices, selection]);

  return (
    <div>
      <div className="font-sen">
        <div className="font-bold text-[24px] mb-3">Pilihan Karir</div>
        <div className="text-[13px] md:text-[15px] mb-5">
          Kamu bisa memilih <span className="font-bold">dua karir</span> yang
          kamu minati. Jangan lewatkan kesempatan ini!
        </div>
      </div>

      <div className="flex gap-x-5 lg:flex-wrap lg:justify-center overflow-auto lg:overflow-visible mb-3">
        {(careerList || []).map((c: any) => (
          <CareerCard
            key={c.id}
            id={c.id}
            name={c.title}
            kuota={c.kuota}
            pendaftar={c.pendaftar}
            isDisabled={choices.length >= 2 && !choices.includes(c.id)}
            onClick={() => handleSelect(c.id)}
            onCancel={() => handleUnselect(c.id)}
            selected={choices.includes(c.id)}
          />
        ))}
      </div>

      <div className="flex justify-center text-center mb-5">
        <div className="w-[130px] h-[50px]">
          {isChanged && <Button isPrimary={true} text="Submit" type="submit" />}
          {isSame && (
            <Button isPrimary disabled text="Submitted" type="submit" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PathSelection;
