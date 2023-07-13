import DashboardHeader from "@/components/DashboardHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardHeader title="KAKAK ASUH" />
      {children}
    </div>
  );
};

export default Layout;
