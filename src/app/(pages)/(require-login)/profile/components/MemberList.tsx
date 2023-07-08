"use client";

import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

// Component imports
import MemberDetail, { MemberDetailProps } from "./MemberDetail";

interface MemberListProps {
  nomorKelompok?: string;
  anggotaMentor?: MemberDetailProps[];
  kakakAsuh?: MemberDetailProps[];
}

const MemberList = () => {
  const session = useSession();

  const { data, error, isLoading } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/user/" +
      (session.data?.user as User).nim,
    fetcher
  );

  let member: MemberListProps = {};

  if (data) {
    member = { nomorKelompok: data.user.kelompok, anggotaMentor: data.mentors };
  }

  return (
    <div className="flex flex-col w-full p-5 md:p-8 bg-white border-primaryDark-400 border-[5px] rounded-xl text-left lg:w-[29vw]">
      <p className="font-koulen text-primaryDark-400 text-h5 md:text-h4">
        KELOMPOK {member.nomorKelompok}
      </p>
      <p className="font-koulen text-black text-h6 md:text-h5">MENTOR</p>
      <div className="flex flex-col items-start py-5 gap-5">
        {member.anggotaMentor?.map((anggota, index) => (
          <MemberDetail key={index} {...anggota} />
        ))}
      </div>

      {/* <p className="font-koulen text-primaryDark-400 text-h5 md:text-h4">
          KAKAK ASUH
        </p>
        <div className="flex flex-col items-start py-5 gap-5">
          {
            kakakAsuh?.map((kakakAsuh, index) => (
              <MemberDetail key={index} {...kakakAsuh} />
            ))
          }
        </div> */}
    </div>
  );
};

export default MemberList;
