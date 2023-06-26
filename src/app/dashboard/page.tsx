"use client"

import { useState } from "react";
import AddAssignment from "./components/AddAssignment";
import NavDashboard from "./components/NavDashboard";
import AddModule from "./components/AddModule";
import DashboardHeader from "@/components/DashboardHeader";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <DashboardHeader title="DASHBOARD" />
      <NavDashboard activeIndex={activeIndex} handleItemClick={handleItemClick}/>
      {activeIndex === 0 && <AddModule />}
      {activeIndex === 1 && <AddAssignment />}
    </div>
  );
};

export default Dashboard;
