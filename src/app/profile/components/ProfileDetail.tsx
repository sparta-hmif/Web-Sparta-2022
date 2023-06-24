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
  nomorKelompok?: number;
}

const ProfileDetail = ({
  profilePicture,
  namaLengkap = "NAMA LENGKAP DARI PENGGUNA",
  namaPanggilan = "NAMA PANGGILAN",
  nim = "13521000",
  jurusan = "STIF",
  usernameIG = "NAMA_IG",
  tanggalLahir = new Date(6 / 6 / 2003),
  skor = 13521,
  nomorKelompok = 0,
}: ProfileDetailProps) => {
  const defaultProfilePict = "/images/landing/placeholder.jpg";
  const defaultAlt = "Foto Profil";
  return (
    <div className="flex flex-col md:flex-row w-screen items-start justify-center gap-5">
      <div className="flex flex-col w-[400px] h-fit px-8 py-8 bg-white border-primaryDark-400 border-[5px] rounded-xl text-left">
        <h4 className="font-koulen">KELOMPOK {nomorKelompok}</h4>
        <h5 className="font-koulen">MENTOR</h5>
        <div className="flex flex-col items-start py-5 gap-5">
          <MemberDetail />
          <MemberDetail />
          <MemberDetail />
        </div>

        <h4 className="font-koulen">KAKAK ASUH</h4>
        <div className="flex flex-col items-start py-5 gap-5">
          <MemberDetail />
        </div>
      </div>

      <div className="flex flex-row max-w-[860px] h-fit px-8 py-8 bg-white border-primaryDark-400 border-[5px] rounded-xl text-left gap-8">
        <div className="overflow-hidden rounded-xl">
          <Image
            alt={namaPanggilan || defaultAlt}
            src={profilePicture || defaultProfilePict}
            width={240}
            height={320}
          />
        </div>
        <div className="flex flex-col items-end gap-5">
          <div className="flex flex-col rounded-md bg-[#D9D9D9] p-5">
            <div className="flex flex-row justify-between font-koulen items-center text-h6">
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="flex bg-black rounded-md p-1">
                  <BsInstagram size={20} color="white" />
                </div>
                <div>{usernameIG.toUpperCase()}</div>
              </div>

              <div className="flex flex-row items-center justify-center gap-1">
                <div className="flex pb-1">
                  <BsGift size={20} />
                </div>
                <div>{tanggalLahir.toLocaleDateString()}</div>
              </div>
            </div>
            <h3 className="font-koulen text-primaryDark-400 py-5">
              {namaLengkap.toUpperCase()}
            </h3>
            <div className="flex flex-col items-start gap-1">
              <h5 className="font-koulen text-secondaryDark-500">
                NAMA PANGGILAN: {namaPanggilan.toUpperCase()}
              </h5>
              <h5 className="font-koulen text-secondaryDark-500">NIM: {nim}</h5>
              <h5 className="font-koulen text-secondaryDark-500">
                JURUSAN: {jurusan.toUpperCase()}
              </h5>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="font-koulen text-black pt-10">SKOR : {skor}</h3>
            </div>
          </div>
          <div className="hidden md:block">
            <Button
              isPrimary={true}
              text="Edit"
              // onClick={handleClick}
              type="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
