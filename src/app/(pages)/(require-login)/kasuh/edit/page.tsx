"use client";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import Link from "next/link";
import CardList, { KasuhProps } from "./components/CardList";
import { FaChevronLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";

interface UserSession {
  id: string;
  email: string;
  fullName: string;
  nim: string;
  role: string;
}

// const pilihan: KasuhProps[] = [
//   { rank: 1, nama: "Nama Kakak 1", nim: "13518201", kuota: 3, image: "", alasan: ""},
//   { rank: 2, nama: "Nama Kakak 2", nim: "13518202", kuota: 4, image: "", alasan: ""},
//   { rank: 3, nama: "Nama Kakak 3", nim: "13518203", kuota: 5, image: "" , alasan: ""},
// ];

export default function Page() {
  const session = useSession();

  const { data: dataMyKasuh } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/pendaftaran-kasuh/" +
      (session?.data?.user as UserSession).nim,
    fetcher
  );

  const pilihanKasuh =
    dataMyKasuh &&
    dataMyKasuh.UserDesuh?.PendaftaranKasuh?.map((val: any) => {
      return {
        nama: val?.kasuh?.user?.fullName,
        nim: val?.kasuh?.user?.nim,
        kuota: val?.kasuh?.kuota,
        image: val?.kasuh?.user?.imageURL,
        alasan: val?.alasan,
        idPendaftaranKasuh: val?.id,
      };
    });

  pilihanKasuh &&
    pilihanKasuh?.forEach((val: any, index: any) => {
      val.rank = index + 1;
      val.nimDesuh = (session?.data?.user as UserSession).nim;
    });

  return (
    <div className="container mx-auto w-[87%] max-w-[65rem] py-10">
      <Link href="/kasuh">
        <div className="flex cursor-pointer items-center mb-3 gap-3">
          <FaChevronLeft size={20} className="text-primaryDark-400" />
          <p className="font-sen font-bold text-2xl text-primaryDark-400">
            Back
          </p>
        </div>
      </Link>
      <h2 className=" text-primaryDark-400 text-[40px] lg:text-6xl mt-10">
        PILIHANKU
      </h2>
      <p className=" body-1 text-sm md:text-lg">
        Kamu bisa mengurutkan prioritas pilihan kasuhmu di sini!
      </p>
      <div>{pilihanKasuh && <CardList pilihanKasuh={pilihanKasuh} />}</div>
    </div>
  );
}
