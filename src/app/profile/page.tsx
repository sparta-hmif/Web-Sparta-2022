import MemberList from "./components/MemberList";
import ProfileDetail from "./components/ProfileDetail";
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from "next/navigation";

interface UserSession {
  id: string;
  email: string;
  fullName: string;
  nim: string;
  role: string;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  if (!session) {
    redirect('/login')
  }

  const roleAccess = user.role === 'PESERTA';

  if (session && !roleAccess) {
    redirect('/')
  }

  // Property for each component
  const profileDetailProps = {
    profilePicture: "",
    namaLengkap: "Nama Lengkap",
    namaPanggilan: "Nama Panggilan",
    nim: "123456789",
    jurusan: "Jurusan",
    usernameIG: "usernameIG",
    tanggalLahir: new Date(),
    skor: 9999,
  };

  const memberListProps = {
    nomorKelompok: 1,
    anggotaMentor: [
      {
        nama: "Anggota 1",
        nim: "123456789",
      },
      {
        nama: "Anggota 2",
        nim: "123456789",
      },
    ],
    kakakAsuh: [
      {
        nama: "Kakak 1",
        nim: "123456789",
      },
      {
        nama: "Kakak 2",
        nim: "123456789",
      },
    ],
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[url('/images/profile/Background.svg')] bg-no-repeat bg-bottom bg-cover pt-20 pb-10">
        {/* <div className="relative top-10 z-0 flex items-center justify-center flex-col w-full overflow-x-hidden pb-10"> */}
        <h1 className="text-center font-koulen bg-gradient-to-b from-white to-[#D39947] from-[35%] text-transparent bg-clip-text hidden sm:block">
          PROFILE
        </h1>
        <div className="flex flex-col lg:flex-row justify-center gap-5 container mx-auto px-20">
          <div className="order-2 lg:order-1 w-full lg:w-1/3">
            <MemberList {...memberListProps} />
          </div>
          <div className="order-1 lg:order-2 lg:flex-1 w-full">
            <ProfileDetail {...profileDetailProps} />
          </div>
        </div>
      </div>
    </>
  );
}
