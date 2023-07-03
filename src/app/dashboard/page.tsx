import DashboardClient from "./components/DashboardClient";
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

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  if (!session) {
    redirect('/login')
  }

  const roleAccess = user.role === 'MENTOR' || user.role === 'MAMET';
  
  if (session && !roleAccess) {
    redirect('/')
  }

  return <DashboardClient />;
};

export default Dashboard;
