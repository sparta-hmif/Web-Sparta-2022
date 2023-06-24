import Background from "./components/Background";
import MemberList from "./components/MemberList";
import ProfileDetail from "./components/ProfileDetail";

export default function Home() {
  // Property for each component
  const profileDetailProps = {
    // profilePicture,
    // namaLengkap,
    // namaPanggilan,
    // nim,
    // jurusan,
    // usernameIG,
    // tanggalLahir,
    // skor,
  };
  const memberListProps = {
    // nomorKelompok,
    // anggotaMentor,
    // kakakAsuh,
  };
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll">
      <div className="relative top-10 z-0 flex items-center justify-center flex-col w-full overflow-x-hidden pb-10">
        <h1 className="font-koulen bg-gradient-to-b from-white to-[#D39947] text-transparent bg-clip-text hidden sm:block">
          PROFILE
        </h1>
        <div className="flex flex-col md:flex-row w-full items-center md:items-start justify-center gap-5">
          <div className="hidden md:block">
            <MemberList {...memberListProps} />
          </div>
          <ProfileDetail {...profileDetailProps} />

          <div className="md:hidden">
            <MemberList {...memberListProps} />
          </div>
        </div>
      </div>
      <div className="absolute w-full h-full top-0 z-[-100]">
        <Background />
      </div>
    </div>
  );
}
