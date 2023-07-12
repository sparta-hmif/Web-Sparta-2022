"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import AssignmentDetail, {
  assignmentDetailProps,
  assignmentProps,
} from "../components/AssignmentDetail";
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

  let mappedData: assignmentDetailProps = {};

  if (data) {
    const userList = [
      ...data.submisiTugas.map((val: any, index: number) => ({
        rank: index + 1,
        name: val.user.fullName,
        nim: val.user.nim,
        status: true,
        link: val.link,
      })),
      ...data.missingUsers.map((val: any, index: number) => ({
        rank: index + 1,
        name: val.fullName,
        nim: val.nim,
        status: false,
      })),
    ];

    mappedData = {
      title: data.title,
      dayNumber: data.day.number,
      startTime: data.startTime,
      endTime: data.endTime,
      data: userList,
      uploadCount: data.submisiTugas.length,
      totalSpartan: data.submisiTugas.length + data.missingUsers.length,
    };
  }
  return (
    <div className="container mx-auto py-10">
      <AssignmentDetail {...mappedData} />
    </div>
  );
}
