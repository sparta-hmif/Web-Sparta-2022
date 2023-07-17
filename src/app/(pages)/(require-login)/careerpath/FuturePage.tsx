import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <DashboardHeader title="Career Path" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
