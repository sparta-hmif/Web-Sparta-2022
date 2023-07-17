import DashboardHeader from "@/components/DashboardHeader";
import ViewKasuh from "./components/ViewKasuh";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSession } from "@/components/UserFetcher";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  if (!session) {
    redirect("/login");
  }

  const roleAccess = user.role === "KASUH" || user.role === "ADMIN";

  if (session && !roleAccess) {
    redirect("/");
  }

  return (
    <div>
      <DashboardHeader title="KAKAK ASUH" />
      <ViewKasuh />
      {children}
    </div>
  );
};

export default Layout;
