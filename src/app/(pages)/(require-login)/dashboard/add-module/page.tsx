import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { UserSession } from "@/components/UserFetcher";
import AddModule from "./components/AddModule";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  const roleAccess = user.role === "MAMET" || user.role === "ADMIN";

  if (!roleAccess) {
    redirect("/");
  }

  return <AddModule />;
};

export default Page;
