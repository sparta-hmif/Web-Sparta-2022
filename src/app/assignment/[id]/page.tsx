"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

// Component imports
import Assignment from "./components/Assignment";

const Page = ({ params }: { params: { id: string } }) => {
  const session = useSession();

  const { data, error, isLoading } = useSWR(
    () =>
      "https://www.sparta22hmif.com/api/tugas/" +
      (session.data?.user as User).nim +
      "/" +
      params.id,
    fetcher
  );

  const mappedData = {
    judulTugas: data?.title || "",
    dayTugas: data?.day?.number || 0,
    startDate: new Date(data?.startTime) || new Date(),
    endDate: new Date(data?.endTime) || new Date(),
    deskripsi: data?.description || "",
    attachment:
      data?.attachments.map((val: any) => ({
        judul: val.title,
        link: val.link,
      })) || [],
    isSubmitted: data?.submisiTugas || false,
  };

  return <Assignment {...mappedData} tugasId={params.id} />;
};

export default Page;
