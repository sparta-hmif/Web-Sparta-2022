"use client"

import { useState } from "react";
import AddAssignment from "./components/AddAssignment";
import NavDashboard from "./components/NavDashboard";
import AddModule from "./components/AddModule";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <div className="bg-[url('/images/dashboard/background.svg')] h-60 bg-bottom bg-cover bg-no-repeat flex justify-center items-center">
        <h1 className="bg-gradient-to-b from-white to-[#D39947] bg-clip-text text-transparent from-40% font-koulen md:text-[105px] sm:text-[80px] text-[70px]">
          DASHBOARD
        </h1>
      </div>
      <NavDashboard activeIndex={activeIndex} handleItemClick={handleItemClick}/>
      {activeIndex === 0 && <AddModule />}
      {activeIndex === 1 && <AddAssignment />}
    </div>
  );
};

export default Dashboard;
