import MemberDetail from "./MemberDetail";

interface MemberDetailProps {
  profile?: string;
  nama?: string;
  nim?: string;
}

interface MemberListProps {
  nomorKelompok?: number;
  anggotaMentor?: MemberDetailProps[];
  kakakAsuh?: MemberDetailProps[];
}

const MemberList = ({
  nomorKelompok,
  anggotaMentor,
  kakakAsuh,
}: MemberListProps) => {
  return (
    <div className="flex flex-col w-full p-5 md:p-8 bg-white border-primaryDark-400 border-[5px] rounded-xl text-left">
      {/* <div className="w-[250px] md:w-[350px]"> */}
        <p className="font-koulen text-primaryDark-400 text-h5 md:text-h4">
          KELOMPOK {nomorKelompok}
        </p>
        <p className="font-koulen text-black text-h6 md:text-h5">MENTOR</p>
        <div className="flex flex-col items-start py-5 gap-5">
          {anggotaMentor?.map((anggota, index) => (
            <MemberDetail key={index} {...anggota} />
          ))}
        </div>

        <p className="font-koulen text-primaryDark-400 text-h5 md:text-h4">
          KAKAK ASUH
        </p>
        <div className="flex flex-col items-start py-5 gap-5">
          {
            kakakAsuh?.map((kakakAsuh, index) => (
              <MemberDetail key={index} {...kakakAsuh} />
            ))
          }
        </div>
      </div>
    // </div>
  );
};

export default MemberList;
