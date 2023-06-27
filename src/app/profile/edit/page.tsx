import DashboardHeader from "@/components/DashboardHeader";
import EditProfile from "@/app/profile/edit/components/EditProfile";

const Page = () => {
  return (
    <div>
      <DashboardHeader title="PROFILE" />
      <EditProfile />
    </div>
  );
};

export default Page;
