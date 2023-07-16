"use client"
import Countdown from "./components/Coundown";
import ListDesuh from "./components/ListDesuh";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import { useSession } from "next-auth/react";

interface UserSession {
  id: string;
  email: string;
  fullName: string;
  nim: string;
  role: string;
}

const data = [
  {
    nama: "ADEK ASUH 1",
    nim: "19222001",
    alasan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    photoUrl: "",
    accepted: true,
  },
  {
    nama: "ADEK ASUH 2",
    nim: "19222002",
    alasan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    photoUrl: "",
    accepted: false,
  },
  {
    nama: "ADEK ASUH 3",
    nim: "19222003",
    alasan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    photoUrl: "",
    accepted: false,
  },
  {
    nama: "ADEK ASUH 4",
    nim: "19222004",
    alasan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    photoUrl: "",
    accepted: false,
  },
  {
    nama: "ADEK ASUH 5",
    nim: "19222005",
    alasan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    photoUrl: "",
    accepted: false,
  },
];

const Page = () => {
  const date = new Date("08/17/2023 23:59:59").getTime();

  const session = useSession();
  const user = session?.data?.user as UserSession;

  const { data: dataMyDesuh } = useSWR(() => process.env.NEXT_PUBLIC_WEB_URL + `/api/all-desuh/${user?.nim}`, fetcher);

  const processedData = dataMyDesuh?.adikAsuh?.map((val: any) => {
    return {
      nama: val?.desuh.user.fullName || "",
      nim: val?.desuh.user.nim || "",
      alasan: val?.alasan || "",
      photoUrl: val?.desuh.user.imageURL || "",
      accepted: val?.approved,
    };
  });

  return (
    <div className="py-10 md:py-20 px-7 lg:px-0 w-full container max-w-[80rem] mx-auto">
      <Countdown target={date} />
      <div className="my-5 lg:my-[54px] flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h2 className="text-primaryDark-400 text-[40px] lg:text-[64px]">
            Pemilihan Desuh{" "}
            <span className="hidden lg:inline">(Adek Asuh)</span>
          </h2>
          <p className="body-1 text-[10px] lg:text-[16px]">
            Silakan pilih adek asuh yang sesuai dengan kriteriamu ya~
          </p>
        </div>
      </div>
      {processedData && <ListDesuh data={processedData} />}
    </div>
  );
};

export default Page;
