"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import Day from "./components/Day";
import DayModal from "./components/DayModal";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

const Journey = () => {
  const [showModal, setShowModal] = useState(0);
  const [contentData, setContentData] = useState({
    day: 0,
    date: new Date().toISOString(),
    starReview: 0,
    story: "",
    reflection: "",
    isVisible: false,
  });

  const session = useSession();

  const { data, error, isLoading } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/day/" +
      (session.data?.user as User).nim,
    fetcher
  );

  if (!data) {
    return <div></div>;
  }

  const onClose = () => {
    setShowModal((prev) => {
      setContentData({
        day: 0,
        date: new Date().toISOString(),
        starReview: 0,
        story: "",
        reflection: "",
        isVisible: false,
      });
      return 0;
    });
  };

  const onOpen = (day: number) => {
    setContentData({
      day: day,
      date: data[day - 1].date,
      starReview: data[day - 1].evalDay[0]?.rating,
      story: data[day - 1].evalDay[0]?.story,
      reflection: data[day - 1].evalDay[0]?.reflection,
      isVisible: true,
    });
  };

  return (
    <div className="pt-10 relative">
      <Day day={data.length} onOpen={onOpen} />
      {contentData.isVisible && (
        <DayModal
          day={contentData.day}
          date={contentData.date}
          content={contentData}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default Journey;
