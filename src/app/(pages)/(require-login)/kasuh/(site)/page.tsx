"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import Button from "@/components/Button";
import PemilihanKasuh from "../components/PemilihanKasuh";
import { dataProp } from "../components/PemilihanKasuh";
import Link from "next/link";
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

  const {
    data: dataMyKasuh,
    error,
    isLoading,
  } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/pendaftaran-kasuh/" +
      (session?.data?.user as UserSession).nim,
    fetcher
  );

  const { data: dataAllKasuh } = useSWR(
    () => process.env.NEXT_PUBLIC_WEB_URL + "/api/all-kasuh",
    fetcher
  );

  //masukin atribut kuota ke atribut user
  const processedData = dataAllKasuh?.map((val: any) => {
    return {
      nim: val?.user.nim || "",
      name: val?.user.fullName || "",
      kuota: val?.kuota || 0,
      image: val?.user.imageURL || "",
    };
  });

  return (
    <div className="container mx-auto w-[87%] max-w-[65rem] py-10 md:pt-32">
      <h2 className=" text-primaryDark-400 text-[40px] lg:text-6xl">
        Pemilihan Kakak Asuh (Kasuh)
      </h2>
      <p className=" body-1 text-sm md:text-lg">
        Berisi sekumpulan aa kasep dan neng geulis HMIF ITB 2021 yang akan
        memberikan warna di dunia perkuliahanmu! Silakan pilih 3 calon kandidat
        kakak asuh yang kamu mau! #TakeKasuhOut
      </p>
      <Link href="/kasuh/edit">
        <div className=" my-5 w-full">
          <Button
            isPrimary={true}
            text={`Pilihan Kakak Asuhku - ${
              dataMyKasuh?.UserDesuh?.PendaftaranKasuh.length ?? 0
            }/3`}
          />
        </div>
      </Link>
      <PemilihanKasuh data={processedData} />
    </div>
  );
};

export default Page;
