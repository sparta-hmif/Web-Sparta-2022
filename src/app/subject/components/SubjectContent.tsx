"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import Card from "./card";

interface Data {
  id: string;
  namaMateri: string;
  tanggalRilis: Date;
}

export default function SubjectContent(): JSX.Element {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/all-materi",
    fetcher
  );

  const mappedData: Data[] =
    data?.map((data: any) => ({
      id: data.id,
      namaMateri: data.title,
      tanggalRilis: data.expiredDate,
    })) || [];

  return (
    <div className="flex flex-col items-center py-10 container mx-auto max-w-[60rem] px-10">
      {mappedData.map((data, index) => (
        <Card
          key={index}
          id={data.id}
          namaMateri={data.namaMateri}
          tanggalRilis={new Date(data.tanggalRilis)}
        />
      ))}
    </div>
  );
}
