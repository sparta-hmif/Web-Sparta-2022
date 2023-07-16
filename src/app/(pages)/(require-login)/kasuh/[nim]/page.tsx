"use client";
import { AiFillInstagram } from "react-icons/ai";
import { FaLine } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import DaftarKasuh from "./components/DaftarKasuh";
import Link from "next/link";
import Image from "next/image";
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

const Page = ({ params }: { params: { nim: string } }) => {
  const { nim: nimKasuh } = params;
  const session = useSession();
  const user = session?.data?.user as UserSession;

  const { data } = useSWR(
    () => process.env.NEXT_PUBLIC_WEB_URL + `/api/kasuh/${nimKasuh}`,
    fetcher
  );

  const { data: dataMyKasuh } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/pendaftaran-kasuh/" +
      (session?.data?.user as UserSession).nim,
    fetcher
  );

  const isAlreadyChoose =
    dataMyKasuh &&
    dataMyKasuh.UserDesuh?.PendaftaranKasuh?.find(
      (val: any) => val.kasuh.user.nim === nimKasuh
    ) !== undefined;

  const idPendaftaranKasuh =
    dataMyKasuh &&
    dataMyKasuh.UserDesuh?.PendaftaranKasuh?.find(
      (val: any) => val.kasuh.user.nim === nimKasuh
    )?.id;

  const alasan =
    dataMyKasuh &&
    dataMyKasuh.UserDesuh?.PendaftaranKasuh?.find(
      (val: any) => val.kasuh.user.nim === nimKasuh
    )?.alasan;

  return (
    <div className="w-full min-h-screen bg-[url('/images/profil-kasuh/background.svg')] bg-cover flex items-center py-20 md:py-26">
      <div className="container bg-white border-4 rounded-2xl border-primaryDark-400 mx-auto w-11/12 max-w-[65rem] px-5 md:px-14 py-10">
        <Link href="/kasuh">
          <div className="flex cursor-pointer items-center mb-3 gap-3">
            <FaChevronLeft size={20} className="text-primaryDark-400" />
            <p className="font-sen font-bold text-xl text-primaryDark-400">
              Back
            </p>
          </div>
        </Link>
        <div className="w-full flex flex-col justify-between items-center md:items-start md:flex-row gap-4 md:gap-11">
          <div className="w-2/3 aspect-square max-w-[20rem] bg-[#D9D9D9] rounded-xl">
            <Image
              src={
                data?.imageURL ? data.imageURL : "/images/landing/sparta.png"
              }
              alt="Profile Kasuh"
              width={200}
              height={200}
              className="w-full aspect-square object-cover object-center"
            />
          </div>
          <div className="w-full md:flex-1 flex flex-col gap-1">
            <div className="flex justify-between mb-1 font-koulen text-black text-xl">
              <div className="flex items-center gap-1">
                <AiFillInstagram size={24} />
                <p>{data && data.instagram}</p>
              </div>
              <div className="flex items-center gap-1">
                <FaLine size={24} />
                <p>{data && data?.UserKasuh?.line}</p>
              </div>
            </div>
            <h4 className="text-primaryDark-400 font-koulen text-3xl md:text-5xl my-2">
              {data && data.fullName}
            </h4>
            <h6 className="text-secondaryDark-500 text-xl md:text-2xl font-koulen">
              NAMA PANGGILAN: {data && data.shortName}
            </h6>
            <h6 className="text-secondaryDark-500 text-xl md:text-2xl font-koulen">
              NIM: {data && data.nim?.slice(5)}
            </h6>
            <h6 className="text-secondaryDark-500 text-xl md:text-2xl font-koulen">
              JURUSAN:{" "}
              {data && (data.nim?.substring(5, 3) === "182" ? "STI" : "IF")}
            </h6>
            <p className="caption md:body-1">
              {data && data.UserKasuh?.deskripsi}
            </p>
          </div>
        </div>
        {dataMyKasuh && (
          <DaftarKasuh
            registered={isAlreadyChoose || false}
            nimKasuh={nimKasuh}
            nimDesuh={user?.nim}
            alasan={alasan || ""}
            idPendaftaranKasuh={idPendaftaranKasuh}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
