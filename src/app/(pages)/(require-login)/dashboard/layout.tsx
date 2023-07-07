import DashboardHeader from "@/components/DashboardHeader";
import NavDashboard from "./components/NavDashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

interface UserSession {
  id: string;
  email: string;
  fullName: string;
  nim: string;
  role: string;
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  if (!session) {
    redirect("/login");
  }

  const roleAccess =
    user.role === "MENTOR" || user.role === "MAMET" || user.role === "ADMIN";

  if (session && !roleAccess) {
    redirect("/");
  }
  return (
    <div>
      <DashboardHeader title="DASHBOARD" />
      <NavDashboard />
      {children}
    </div>
  );
};

export default DashboardLayout;
