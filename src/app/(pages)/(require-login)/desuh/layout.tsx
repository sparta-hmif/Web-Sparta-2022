import DashboardHeader from "@/components/DashboardHeader";
import ViewKasuh from "./components/ViewKasuh";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardHeader title="KAKAK ASUH"/>
      <ViewKasuh />
      {children}
    </div>
  );
};

export default Layout;
