"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import Journey from "./Journey";
import { User } from "@prisma/client";

const ViewJourney = () => {
  const { data, error, isLoading } = useSWR(
    () => process.env.NEXT_PUBLIC_WEB_URL + "/api/all-day/",
    fetcher
  );

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="container mx-auto py-10">
      {(data as any[]).map((assignment, index) => (
        <Journey key={index} {...assignment} />
      ))}
    </div>
  );
};

export default ViewJourney;
