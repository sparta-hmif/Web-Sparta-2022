"use client";

import RankMarker from "./RankMarker";

interface BarProps {
  leftRank: number;
  rightRank: number;
  currRank: number;
}

const countProgress = (left: number, right: number, curr: number): number => {
  const range = left - right;
  const relativeCurrentVal = curr - right;
  const progress = (relativeCurrentVal / range) * 100;
  return progress;
};

const ScoreboardBar = ({ leftRank, rightRank, currRank }: BarProps) => {
  const progress = 100 - countProgress(leftRank, rightRank, currRank);

  return (
    <div>
      <div className="h-[35px] bg-white border-primaryDark-400 border-2 rounded-2xl mx-3 lg:mx-0">
        <div
          className="h-full rounded-2xl bg-primary-400 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute -right-[18px] -top-[18px]">
            <RankMarker width={38} height={24} />
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-3 lg:mx-0 mt-1 font-sen font-bold text-[14px]">
        <div>#{leftRank ? leftRank : 0}</div>
        <div>#{rightRank ? rightRank : 0}</div>
      </div>
    </div>
  );
};

export default ScoreboardBar;
