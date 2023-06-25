import Image from "next/image";

const DashboardHeader = () => {
  return (
    <div className="relative w-full h-full">
      <div className="font-koulen text-[40px] md:text-[70px] lg:text-[105px] text-transparent bg-clip-text bg-gradient-to-t from-[#D39947] to-[#FFFFFF] uppercase absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        DASHBOARD
      </div>
      <Image
        src="/images/dashboard/background.svg"
        alt="background"
        width={1920}
        height={315}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default DashboardHeader;
