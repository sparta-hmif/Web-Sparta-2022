import MemberDetail from "./MemberDetail";

interface MemberDetailProps {
  profilePictMember?: string;
  namaMember?: string;
  nimMember?: string;
}

interface MemberListProps {
  nomorKelompok?: number;
  anggotaMentor?: MemberDetailProps[];
  kakakAsuh?: MemberDetailProps;
}

const MemberList = ({
  nomorKelompok,
  anggotaMentor,
  kakakAsuh,
}: MemberListProps) => {
  return (
    <div className="flex flex-col w-fit h-fit p-5 md:p-8 bg-white border-primaryDark-400 border-[5px] rounded-xl text-left">
      <div className="w-[250px] md:w-[350px]">
        <p className="font-koulen text-primaryDark-400 text-h5 md:text-h4">
          KELOMPOK {nomorKelompok}
        </p>
        <p className="font-koulen text-black text-h6 md:text-h5">MENTOR</p>
        <div className="flex flex-col items-start py-5 gap-5">
          {anggotaMentor?.map((anggota) => (
            <MemberDetail {...anggota} />
          ))}
        </div>

        <p className="font-koulen text-primaryDark-400 text-h5 md:text-h4">
          KAKAK ASUH
        </p>
        <div className="flex flex-col items-start py-5 gap-5">
          <MemberDetail {...kakakAsuh} />
        </div>
      </div>
    </div>
  );
};

export default MemberList;
