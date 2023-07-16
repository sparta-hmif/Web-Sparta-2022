"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

interface UserSession {
  id: string;
  email: string;
  fullName: string;
  nim: string;
  role: string;
}

const Page = () => {
  const session = useSession();
  const user = session?.data?.user as UserSession;

  const { data: deskripsiKasuh } = useSWR(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/kasuh/${user?.nim}`,
    fetcher
  );

  const [description, setDescription] = useState("");

  useEffect (() => {
    setDescription(deskripsiKasuh?.UserKasuh?.deskripsi);
  }
  , [deskripsiKasuh?.UserKasuh?.deskripsi])

  const handleSave = async () => {
    // send put request to {{URL}}/deskripsi-kasuh/:user.nim
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/deskripsi-kasuh/${user.nim}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deskripsi: description,
        }),
      }
    );
  };

  return (
    <>
      <div className="w-full py-10 md:py-20 px-7 lg:px-0 flex flex-col gap-2 text-center container max-w-[80rem] mx-auto">
        <p className="text-base md:text-lg font-sen font-bold">
          Halo Calon Kasuh!
        </p>
        <p className="body-1 text-sm md:text-base text-center">
          Silakan ceritakan tentang dirimu untuk memikat para SPARTANS! Kamu
          dianjurkan untuk menuliskan{" "}
          <span className="font-semibold">perkenalan singkat</span> tentang
          dirimu, beserta dengan{" "}
          <span className="font-semibold">
            hobi, MBTI, interest (lingkup HMIF atau luar),
          </span>{" "}
          dan <span className="font-semibold">domisili</span>. Inilah ajang
          untukmu memperkenalkan dirimu dengan semenarik mungkin. Ingat ya,
          tidak boleh menyinggung SARA. Selamat memikat para SPARTANS!
        </p>
        <h5 className="text-left font-bold text-lg md:text-2xl text-primaryDark-400 mt-12">
          Deskripsi
        </h5>
        <div className="mt-2 w-full flex items-center">
          <textarea
            className="w-full rounded-lg h-72 text-sm md:text-lg bg-primaryLight-400 text-secondaryDark-400 p-2 md:p-3 resize-none focus:outline-none focus:ring-0 focus:border-primaryDark-400"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="w-1/3 max-w-xs self-end mt-10">
          <Button
            isPrimary={true}
            text={"Save"}
            type={"button"}
            onClick={handleSave}
          />{" "}
        </div>
      </div>
    </>
  );
};

export default Page;
