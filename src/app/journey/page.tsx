"use client";

import { useState } from "react";
import Day from "./components/Day";
import DayModal from "./components/DayModal";

const Journey = () => {
  const [showModal, setShowModal] = useState(0);

  const onClose = () => {
    setShowModal(0);
  }

  const onOpen = (day: number) => {
    setShowModal(day);
  }
  
  const contentData = {
    starReview: 3,
    story: "Aku hari ini...",
    reflection: "Aku bersyukur karena...",
  }

  return (
    <div className="pt-10 relative">
      <Day day={3} onOpen={onOpen}/>
      {showModal !== 0 && <DayModal day={showModal} date="10/03/2023" content={contentData} onClose={onClose}/>}
    </div>
  );
};

export default Journey;
