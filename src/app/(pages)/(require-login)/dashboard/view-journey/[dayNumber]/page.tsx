"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import JourneyDetail, { journeyDetailProps } from "../components/JourneyDetail";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

export default function ViewJourneyDetail({
  params,
}: {
  params: { dayNumber: string };
}) {
  const session = useSession();

  const { data, error, isLoading } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/day-eval/" +
      params.dayNumber +
      ((session.data?.user as User).role === "MENTOR"
        ? `?kelompok=${(session.data?.user as User).kelompok}`
        : ""),
    fetcher
  );

  let mappedData: journeyDetailProps = {};

  if (data) {
    const userList = [
      ...data.evalDay.map((val: any, index: number) => ({
        rank: index + 1,
        name: val.user.fullName,
        nim: val.user.nim,
        status: true,
      })),
      ...data.missingUsers.map((val: any, index: number) => ({
        rank: index + 1,
        name: val.fullName,
        nim: val.nim,
        status: false,
      })),
    ];

    mappedData = {
      number: data.number,
      date: data.date,
      data: userList,
      uploadCount: data.evalDay.length,
      totalSpartan: data.evalDay.length + data.missingUsers.length,
    };
  }
  return (
    <div className="container mx-auto py-10">
      <JourneyDetail {...mappedData} />
    </div>
  );
}
