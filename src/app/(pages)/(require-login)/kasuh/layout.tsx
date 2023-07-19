import Footer from "@/components/Footer";
import PaginationProvider from "./context/PaginationContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PaginationProvider>{children}</PaginationProvider>
      <Footer />
    </div>
  );
};

export default Layout;
