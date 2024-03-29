"use client";

import Image from "next/image";
import Link from "next/link";
import { BsInstagram, BsGift } from "react-icons/bs";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

// Asset imports
import SpartaLogo from "@/../public/images/landing/sparta.png";

interface ProfileDetailProps {
  imageURL?: string;
  fullName?: string;
  shortName?: string;
  nim?: string;
  jurusan?: string;
  instagram?: string;
  // tanggalLahir?: Date;
  score?: number;
}

const ProfileDetail = () => {
  const session = useSession();

  const { data, error, isLoading } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/user/" +
      (session.data?.user as User).nim,
    fetcher
  );

  let user: ProfileDetailProps = {};

  if (data) {
    user = data.user;
  }

  return (
    <div className="bg-white border-primaryDark-400 border-[5px] rounded-xl flex flex-col items-center lg:items-end px-2 py-8 md:p-10 gap-8">
      <div className="flex flex-col md:flex-row w-full text-left gap-8 items-center justify-center ">
        <div className="flex items-center overflow-hidden w-1/2 aspect-square lg:w-[35%] lg:h-[22rem] z-10 rounded-xl">
          <div className="w-full h-auto relative aspect-square rounded-xl overflow-hidden z-10">
            <Image
              alt="profileSpartan"
              src={user.imageURL || SpartaLogo}
              fill={true}
              className="object-cover object-center"
              unoptimized={true}
            />
          </div>
        </div>
        <div className="flex flex-col rounded-md lg:bg-[#D9D9D9] p-5 w-full lg:flex-1">
          <div className="flex flex-row justify-between font-koulen items-center text-h6">
            <div className="flex flex-row items-center justify-center gap-1">
              <div className="flex bg-black rounded-md p-1">
                <BsInstagram size={20} color="white" />
              </div>
              <p className="font-koulen text-black text-sub-1 md:text-h6">
                {user.instagram || "[username instagram]"}
              </p>
            </div>

            {/* <div className="flex flex-row items-center justify-center gap-1">
              <div className="flex pb-1">
                <BsGift size={20} />
              </div>
              <p className="font-koulen text-black text-sub-1 md:text-h6">
                {tanggalLahir.toLocaleDateString()}
              </p>
            </div> */}
          </div>
          <p className="font-koulen text-primaryDark-400 py-5 text-h4 md:text-h3">
            {user.fullName?.toUpperCase()}
          </p>
          <div className="flex flex-col items-start gap-1">
            <p className="font-koulen text-secondaryDark-500 text-h6 md:text-h5">
              NAMA PANGGILAN: {user.shortName?.toUpperCase()}
            </p>
            <p className="font-koulen text-secondaryDark-500 text-h6 md:text-h5">
              NIM: {user.nim}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="font-koulen text-black pt-10 text-h4 md:text-h3">
              SKOR : {user.score}
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/12 min-w-[10rem]">
        <Link href="/profile/edit">
          <Button isPrimary={true} text="Edit" type="button" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetail;
