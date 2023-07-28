import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { UserSession } from "@/components/UserFetcher";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  if (!session) {
    redirect("/login");
  }

  const roleAccess = user.role === "PESERTA" || user.role === "ADMIN";

  if (session && !roleAccess) {
    redirect("/");
  }

  return (
    <div className="">
      <DashboardHeader title="Career Path" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
