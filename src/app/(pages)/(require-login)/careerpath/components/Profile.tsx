"use client";

import { CSSTransition } from "react-transition-group";
import AdditionalProfile from "./AdditionalProfile";
import "./Profile.css";
import { useEffect, useMemo, useState } from "react";
import { PersonData } from "./DataDiri";

interface ProfileProps {
  isAdditionalProfileShown: boolean;
  targetDate: Date;
  dataPerson: PersonData[];
  currPersonIndex: number;
}

const Profile = ({
  isAdditionalProfileShown,
  targetDate,
  dataPerson,
  currPersonIndex,
}: ProfileProps) => {
  const [screenSize, setScreenSize] = useState(640);
  useEffect(() => {
    function getScreenSize() {
      return window.innerWidth;
    }
    function handleResize() {
      setScreenSize(getScreenSize());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const currPerson = useMemo(
    () => dataPerson[currPersonIndex],
    [dataPerson, currPersonIndex]
  );
  return (
    <div className="rounded-xl mx-[1.5px] px-3 lg:pr-5 bg-white">
      <div>
        <div className="flex lg:gap-x-5 mt-[2px] lg:mb-10 pt-2 md:pb-2 justify-between items-center">
          <div className="w-10 h-10 md:w-[60px] md:h-[60px] lg:w-[120px] lg:h-[120px] rounded-full text-center bg-primaryDark-400 p-4 md:m-2 lg:p-8"></div>
          <div className="flex lg:flex-col lg:justify-end gap-1 gap-x-3 items-center lg:items-end text-primaryDark-400">
            <div className="font-koulen text-primaryDark-500 flex gap-x-0.5 items-end">
              <div className="text-[28px] pb-0.5">#</div>
              <div className="text-[36px] md:text-[40px] lg:text-[44px]">
                {currPerson.rank}
              </div>
            </div>
            <div className="bg-primaryDark-400 text-[12px] md:text-[16px] lg:text-[26px] px-4 py-2.5 justify-self-end rounded-lg font-koulen text-white tracking-wide">
              {currPerson.points} PTS
            </div>
          </div>
        </div>
        {screenSize < 1024 ? (
          <CSSTransition
            in={isAdditionalProfileShown}
            timeout={600}
            classNames="profile-transition"
            unmountOnExit
          >
            <div className="font-koulen text-[36px] text-primaryDark-400 leading-tight">
              {currPerson.name}
            </div>
          </CSSTransition>
        ) : (
          <div className="font-koulen text-[36px] text-primaryDark-400 leading-tight">
            {currPerson.name}
          </div>
        )}
        <CSSTransition
          in={isAdditionalProfileShown}
          timeout={600}
          classNames="position-transition"
        >
          <div className="text-primaryDark-400 font-sen mt-2 pb-3 md:pb-4 text-[14px] md:text-[15px]">
            Kamu berada pada posisi {currPerson.rank} dari leaderboard, sehingga
            kamu baru bisa mengisi career path-mu pada {targetDate.getDate()}-
            {("0" + (targetDate.getMonth() + 1)).slice(-2)}-
            {targetDate.getFullYear()}.
          </div>
        </CSSTransition>
        {screenSize < 1024 ? (
          <CSSTransition
            in={isAdditionalProfileShown}
            timeout={600}
            classNames="profile-transition"
            unmountOnExit
          >
            <div>
              <AdditionalProfile scoreboard={dataPerson} currPersonIndex={currPersonIndex} />
            </div>
          </CSSTransition>
        ) : (
          <div>
            <AdditionalProfile scoreboard={dataPerson} currPersonIndex={currPersonIndex} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
