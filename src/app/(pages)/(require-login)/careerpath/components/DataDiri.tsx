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

export const testData = [
  { name: "Jane Doe", rank: 1, points: 9999 },
  { name: "John Doe", rank: 2, points: 9988 },
  { name: "Jen Doe", rank: 3, points: 9977 },
  { name: "Jin Doe", rank: 4, points: 9900 },
  { name: "Jun Doe", rank: 5, points: 8003 },
  { name: "Jog Doe", rank: 6, points: 5060 },
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
          currPerson={testData[0]}
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
