"use client";
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

const Page = () => {
  const session = useSession();

  const { data: dataMyDesuh, mutate } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/all-desuh/" +
      (session?.data?.user as UserSession).nim,
    fetcher
  );

  const processedData = dataMyDesuh?.adikAsuh?.map((val: any) => {
    return {
      id: val?.id || "",
      nama: val?.desuh.user.fullName || "",
      nim: val?.desuh.user.nim || "",
      alasan: val?.alasan || "",
      photoUrl: val?.desuh.user.imageURL || "",
      accepted: val?.approved || 0,
      rank: val?.rank || 0,
      isEligible: val?.isEligible || false,
    };
  });

  return (
    <div className="py-10 md:py-20 px-7 md:px-10 w-full container max-w-[80rem] mx-auto">
      {/* <Countdown target={date} /> */}
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
      {processedData && <ListDesuh data={processedData} mutate={mutate} />}
    </div>
  );
};

export default Page;
