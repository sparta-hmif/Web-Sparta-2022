"use client";

import { useRef, useState } from "react";
import ArrowButton from "./ArrowButton";
import "./Profile.css";
import Profile from "./Profile";
import { CSSTransition } from "react-transition-group";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

export interface PersonData {
  nim: string;
  rank: number;
  name: string;
  points: number;
  imageURL: string;
}

const testData = [
  { name: "Jane Doe", rank: 1, points: 9999 },
  { name: "John Doe", rank: 2, points: 9918 },
  { name: "Jen Doe", rank: 3, points: 9977 },
];

const DataDiri = ({ targetDate }: { targetDate: Date }) => {
  const [isArrowPressed, setIsArrowPressed] = useState(false);
  const toggleArrowPress = (evt: React.TouchEvent | React.MouseEvent) => {
    setIsArrowPressed(!isArrowPressed);
    evt.preventDefault();
  };

  const session = useSession();
  const nim = (session?.data?.user as User)?.nim;

  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_WEB_URL + "/api/scoreboard",
    fetcher
  );

  if (isLoading) {
    return <div></div>;
  }

  let userRank;
  let data2: any[] = [];

  const personData: PersonData[] = [];
  if (data.spartans) {
    const spartans = data.spartans;

    let count = 1;
    for (let i = 0; i < spartans.length; i++) {
      if (i !== 0 && spartans[i - 1].score > spartans[i].score) {
        count++;
      }

      if (spartans[i].nim === nim) {
        userRank = count;
      }

      const newData = {
        rank: count,
        name: spartans[i].fullName,
        nim: spartans[i].nim,
        score: spartans[i].score,
        image: spartans[i].imageURL || "",
      };

      data2 = [...data2, newData];
    }

    const index = data2.findIndex((val: User) => val.nim === nim);
    const otherIndexes = [
      index === 0 ? 2 : index - 1,
      index,
      index === data2.length - 1 ? data2.length - 3 : index + 1,
    ].sort((a: number, b: number): number => a - b);

    otherIndexes.forEach((val: number) =>
      personData.push({
        nim: data2[val]?.nim,
        name: data2[val]?.name,
        rank: data2[val]?.rank,
        points: data2[val]?.score,
        imageURL: data2[val]?.imageURL,
      })
    );

    personData.sort((a: PersonData, b: PersonData): number => a.rank - b.rank);
  }

  return (
    <div className="bg-primaryDark-400 lg:bg-white lg:border-2 lg:border-primaryDark-400 rounded-xl pt-[1px] lg:min-w-[360px] lg:mb-10">
      <div className="">
        <Profile
          isAdditionalProfileShown={isArrowPressed}
          targetDate={targetDate}
          dataPerson={personData}
          currPersonIndex={personData.findIndex(
            (val: PersonData) => val.nim === nim
          )}
        />
        <CSSTransition
          in={isArrowPressed}
          timeout={1500}
          classNames="button-transition"
        >
          <div className="lg:hidden">
            <ArrowButton
              onArrowClick={toggleArrowPress}
              isDirectionDown={!isArrowPressed}
            />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default DataDiri;
