import Image from "next/image";
import MemberDetail from "./MemberDetail";
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
  editButton?: () => void;
}

const ProfileDetail = ({
  profilePicture,
  namaLengkap = "NAMA LENGKAP DARI PENGGUNA",
  namaPanggilan = "NAMA PANGGILAN",
  nim = "13521000",
  jurusan = "STIF",
  usernameIG = "NAMA_IG",
  tanggalLahir = new Date(),
  skor = 13521,
  editButton,
}: ProfileDetailProps) => {
  const defaultProfilePict = "/images/landing/placeholder.jpg";
  const defaultAlt = "Foto Profil";
  return (
    <div className="flex flex-col md:flex-row w-fit h-fit p-5 md:p-8 bg-white border-primaryDark-400 border-[5px] rounded-xl text-left gap-8 items-center justify-center">
      <div className="overflow-hidden w-[160px] h-[160px] md:w-[240px] md:h-[320px] rounded-xl">
        <img
          alt={namaPanggilan || defaultAlt}
          src={profilePicture || defaultProfilePict}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-end gap-5">
        <div className="flex flex-col rounded-md bg-[#D9D9D9] p-5 w-[250px] md:w-[530px]">
          <div className="flex flex-row justify-between font-koulen items-center text-h6">
            <div className="flex flex-row items-center justify-center gap-1">
              <div className="flex bg-black rounded-md p-1">
                <BsInstagram size={20} color="white" />
              </div>
              <p className="font-koulen text-black text-sub-1 md:text-h6">
                {usernameIG.toUpperCase()}
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
        <div className="hidden md:block w-[130px]">
          <Button
            isPrimary={true}
            text="Edit"
            onClick={editButton}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
