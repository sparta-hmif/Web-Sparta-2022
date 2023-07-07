"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import Scoreboard, { dataProp } from "./components/Scoreboard";

const Page = () => {
  let mappedData: dataProp[] = [];
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_WEB_URL + "/api/scoreboard",
    fetcher
  );

  if (data?.spartans) {
    const { spartans } = data;

    let count = 1;
    for (let i = 0; i < spartans.length; i++) {
      if (i !== 0 && spartans[i - 1].score > spartans[i].score) {
        count++;
      }

      const newData = {
        rank: count,
        name: spartans[i].fullName,
        nim: spartans[i].nim,
        score: spartans[i].score,
        image: "",
      };

      mappedData = [...mappedData, newData];
    }
  }

  return <Scoreboard data={mappedData} />;
};

export default Page;
