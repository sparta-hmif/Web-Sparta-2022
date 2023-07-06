"use client";

import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

// Component imports
import List from "./components/List";

const Dashboard = () => {
  const session = useSession();

  const { data, error, isLoading } = useSWR(
    () =>
      "https://www.sparta22hmif.com/api/all-tugas/" +
      (session.data?.user as User).nim,
    fetcher
  );

  const mappedData =
    data?.map((val: any) => {
      return {
        id: val?.id || "",
        judulTugas: val?.title || "",
        dayTugas: val?.day?.number || 0,
        endDate: new Date(val?.endTime) || new Date(),
        isSubmitted: val?.submisiTugas || false,
      };
    }) || [];

  const nonExpired = mappedData.filter(
    (val: any) =>
      val.endDate.getTime() >= new Date().getTime() && !val.isSubmitted
  );
  const submited = mappedData.filter((val: any) => val.isSubmitted);
  const expired = mappedData.filter(
    (val: any) => val.endDate.getTime() < new Date().getTime()
  );

  const concatData = [...nonExpired, ...submited, ...expired];

  return <List assignments={concatData} />;
};

export default Dashboard;
