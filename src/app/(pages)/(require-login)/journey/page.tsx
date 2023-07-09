"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

// Component imports
import Day from "./components/Day";
import DayModal from "./components/DayModal";

const Journey = () => {
  // Fetch data disini
  const day: number = 0;

  const [showModal, setShowModal] = useState(0);

  if (day === 0) {
    return redirect("/");
  }

  const onClose = () => {
    setShowModal(0);
  };

  const onOpen = (day: number) => {
    setShowModal(day);
  };

  const contentData = {
    starReview: 3,
    story: "Aku hari ini...",
    reflection: "Aku bersyukur karena...",
  };

  return (
    <div className="pt-10 relative">
      <Day day={day} onOpen={onOpen} />
      {showModal !== 0 && (
        <DayModal
          day={showModal}
          date="10/03/2023"
          content={contentData}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default Journey;
