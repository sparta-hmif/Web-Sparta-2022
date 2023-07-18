"use client";

import { useRef, useState } from "react";
import ArrowButton from "./ArrowButton";
import "./Profile.css";
import Profile from "./Profile";
import { CSSTransition } from "react-transition-group";

export interface PersonData {
  rank: number;
  name: string;
  points: number;
}

const testData = [
  { name: "Jane Doe", rank: 1, points: 9999 },
  { name: "John Doe", rank: 2, points: 9918 },
  { name: "Jen Doe", rank: 3, points: 9977 },
];

const DataDiri = ({ targetDate }: { targetDate: Date }) => {
  const [isArrowPressed, setIsArrowPressed] = useState(false);
  const toggleArrowPress = (evt: React.TouchEvent | React.MouseEvent) => {
    setIsArrowPressed(!isArrowPressed);
    evt.preventDefault();
  };

  return (
    <div className="bg-primaryDark-400 lg:bg-white lg:border-2 lg:border-primaryDark-400 rounded-xl pt-[1px] lg:min-w-[360px] lg:mb-10">
      <div className="">
        <Profile
          isAdditionalProfileShown={isArrowPressed}
          targetDate={targetDate}
          dataPerson={testData}
          currPersonIndex={0}
        />
        <CSSTransition
          in={isArrowPressed}
          timeout={1500}
          classNames="button-transition"
        >
          <div className="lg:hidden">
            <ArrowButton
              onArrowClick={toggleArrowPress}
              isDirectionDown={!isArrowPressed}
            />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default DataDiri;
