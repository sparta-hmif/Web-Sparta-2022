"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsInstagram, BsGift } from "react-icons/bs";
import Button from "@/components/Button";

interface ProfileDetailProps {
  profilePicture?: string;
  namaLengkap?: string;
  namaPanggilan?: string;
  nim?: string;
  jurusan?: string;
  usernameIG?: string;
  tanggalLahir?: Date;
  skor?: number;
}

const ProfileDetail = ({
  profilePicture,
  namaLengkap = "",
  namaPanggilan = "",
  nim = "",
  jurusan = "",
  usernameIG = "",
  tanggalLahir = new Date(),
  skor = 0,
}: ProfileDetailProps) => {
  const router = useRouter();
  return (
    <div className="bg-white border-primaryDark-400 border-[5px] rounded-xl flex flex-col items-center lg:items-end px-2 py-8 md:p-10 gap-8">
      <div className="flex flex-col md:flex-row w-full text-left gap-8 items-center justify-center ">
        <div className="overflow-hidden w-1/2 aspect-square lg:w-[35%] lg:h-[22rem] rounded-xl">
          <Image
            alt="profileSpartan"
            src={profilePicture || "/images/landing/placeholder.jpg"}
            height={400}
            width={400}
            className="w-full h-full object-cover object-center"
            unoptimized={true}
          />
        </div>
        <div className="flex flex-col rounded-md lg:bg-[#D9D9D9] p-5 w-full lg:flex-1">
          <div className="flex flex-row justify-between font-koulen items-center text-h6">
            <div className="flex flex-row items-center justify-center gap-1">
              <div className="flex bg-black rounded-md p-1">
                <BsInstagram size={20} color="white" />
              </div>
              <p className="font-koulen text-black text-sub-1 md:text-h6 uppercase">
                {usernameIG}
              </p>
            </div>

            <div className="flex flex-row items-center justify-center gap-1">
              <div className="flex pb-1">
                <BsGift size={20} />
              </div>
              <p className="font-koulen text-black text-sub-1 md:text-h6">
                {tanggalLahir.toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="font-koulen text-primaryDark-400 py-5 text-h4 md:text-h3">
            {namaLengkap.toUpperCase()}
          </p>
          <div className="flex flex-col items-start gap-1">
            <p className="font-koulen text-secondaryDark-500 text-h6 md:text-h5">
              NAMA PANGGILAN: {namaPanggilan.toUpperCase()}
            </p>
            <p className="font-koulen text-secondaryDark-500 text-h6 md:text-h5">
              NIM: {nim}
            </p>
            <p className="font-koulen text-secondaryDark-500 text-h6 md:text-h5">
              JURUSAN: {jurusan.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="font-koulen text-black pt-10 text-h4 md:text-h3">
              SKOR : {skor}
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/12 min-w-[10rem]">
        <Button
          isPrimary={true}
          text="Edit"
          onClick={() => router.push("/profile/edit")}
          type="button"
        />
      </div>
    </div>
  );
};

export default ProfileDetail;
