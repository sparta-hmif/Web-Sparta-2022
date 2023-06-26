const DashboardHeader = ({ title }: { title: string }) => {
  return (
    <div className="bg-[url('/images/dashboard/background.svg')] h-60 bg-bottom bg-cover bg-no-repeat flex justify-center items-center">
      <h1 className="bg-gradient-to-b from-white to-[#D39947] bg-clip-text text-transparent from-40% font-koulen md:text-[105px] sm:text-[80px] text-[70px]">
        {title}
      </h1>
    </div>
  );
};

export default DashboardHeader;
