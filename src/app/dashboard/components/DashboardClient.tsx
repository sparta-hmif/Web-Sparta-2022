"use client"

import { useState } from "react";
import AddAssignment from "./AddAssignment";
import NavDashboard from "./NavDashboard";
import AddModule from "./AddModule";
import DashboardHeader from "@/components/DashboardHeader";
import Scoreboard from "./Scoreboard";
import GradeAssignment from "./GradeAssignment";

const DashboardClient = () => {
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
      {activeIndex === 2 && <GradeAssignment />}
      {activeIndex === 3 && <Scoreboard />}
    </div>
  );
};

export default DashboardClient;
