import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

// Component imports
import MemberList from "../components/MemberList";
import ProfileDetail from "../components/ProfileDetail";

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
    redirect("/login");
  }

  const roleAccess =
    user.role === "PESERTA" ||
    user.role === "ADMIN" ||
    user.role === "MAMET" ||
    user.role === "MENTOR";

  if (session && !roleAccess) {
    redirect("/");
  }

  return (
    <>
      <div className="w-full min-h-screen bg-[url('/images/profile/Background.svg')] bg-no-repeat bg-bottom bg-cover pt-20 pb-10">
        <h1 className="text-center font-koulen bg-gradient-to-b from-white to-[#D39947] from-[35%] text-transparent bg-clip-text hidden sm:block">
          PROFILE
        </h1>
        <div className="flex flex-col lg:flex-row justify-center gap-5 container mx-auto w-[90.8vw] md:px-20">
          <div className="order-2 lg:order-1 w-full">
            <MemberList />
          </div>
          <div className="order-1 lg:order-2 lg:flex-1 w-full">
            <ProfileDetail />
          </div>
        </div>
      </div>
    </>
  );
}
